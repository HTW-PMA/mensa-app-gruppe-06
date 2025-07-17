import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const GEMINI_API_KEY = 'AIzaSyCvfpW-aL6Ro8yF3vM4RH1mOHDXEEDx_1w';

export default function KIFeature() {
    const [meals, setMeals] = useState<string[]>([]);
    const [suggestion, setSuggestion] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadMeals = async () => {
            const today = new Date().toISOString().split('T')[0];
            const cached = await AsyncStorage.getItem(`meals_${today}`);
            if (cached) {
                const parsed = JSON.parse(cached);
                const names = parsed.map((m: any) => m.name).filter((name: string) => !!name);
                setMeals(names);
            } else {
                Alert.alert('Keine Gerichte gefunden', 'Bitte öffne den Speiseplan-Bildschirm mindestens einmal.');
            }
        };
        loadMeals();
    }, []);

    const askGemini = async () => {
        if (meals.length === 0) {
            Alert.alert('Keine Gerichte verfügbar', 'Vorschlag kann nicht generiert werden.');
            return;
        }

        setLoading(true);
        setSuggestion(null);

        const prompt = `Hier ist eine Liste von Gerichten: ${meals.join(', ')}. Schlage ein Gericht vor, das heute eine gute Wahl wäre, und erkläre in einem kurzen Satz warum.`;

        try {
            const response = await fetch(
                'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-goog-api-key': GEMINI_API_KEY,
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [{ text: prompt }],
                            },
                        ],
                    }),
                }
            );

            const data = await response.json();

            if (response.ok && data.candidates && data.candidates.length > 0) {
                const text = data.candidates[0].content.parts[0].text;
                setSuggestion(text);
            } else {
                console.error('Gemini error:', data);
                Alert.alert('Fehler', 'Konnte keinen Vorschlag von Gemini erhalten.');
            }
        } catch (error) {
            console.error('Gemini API Fehler:', error);
            Alert.alert('Fehler', 'Beim Zugriff auf Gemini ist etwas schiefgelaufen.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>🎓 KI Funktion – Essensvorschlag</Text>
                <Button title="🔍 Gericht vorschlagen" onPress={askGemini} disabled={loading} />

                {loading && (
                    <View style={{ marginTop: 20 }}>
                        <ActivityIndicator size="large" color="#007bff" />
                    </View>
                )}

                {suggestion && (
                    <View style={styles.result}>
                        <Text style={styles.resultText}>{suggestion}</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 32, // Extra Abstand nach oben!
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 28,
        textAlign: 'center',
    },
    result: {
        marginTop: 30,
        padding: 16,
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
    },
    resultText: {
        fontSize: 16,
        color: '#333',
    },
});
