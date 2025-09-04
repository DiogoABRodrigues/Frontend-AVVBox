import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { styles } from './styles/MeasurementsScreen.styles';

interface Measurement {
  label: string;
  value: number;
  delta: number;
}

interface HistoricalMeasurement {
  date: string;
  measurements: Measurement[];
}

interface Athlete {
  id: string;
  name: string;
  currentMeasurements: Measurement[];
  historicalMeasurements: HistoricalMeasurement[];
}

// Mock atletas
const athletes: Athlete[] = [
  {
    id: '1',
    name: 'João',
    currentMeasurements: [
      { label: 'Altura', value: 180, delta: 0 },
      { label: 'Peso', value: 75, delta: 1 },
      { label: 'Massa Gorda', value: 20, delta: -1 },
      { label: 'Massa Muscular', value: 35, delta: 0.5 },
      { label: 'Gordura Visceral', value: 10, delta: -0.3 },
    ],
    historicalMeasurements: [
      { date: '2025-09-01', measurements: [] },
      { date: '2025-08-01', measurements: [] },
    ],
  },
  {
    id: '2',
    name: 'Maria',
    currentMeasurements: [
      { label: 'Altura', value: 165, delta: 0 },
      { label: 'Peso', value: 60, delta: -0.5 },
      { label: 'Massa Gorda', value: 22, delta: 0 },
      { label: 'Massa Muscular', value: 30, delta: 0.2 },
      { label: 'Gordura Visceral', value: 8, delta: 0 },
    ],
    historicalMeasurements: [
      { date: '2025-09-01', measurements: [] },
      { date: '2025-08-01', measurements: [] },
    ],
  },
];

export default function MeasurementsScreenPT() {
  const [selectedAthleteId, setSelectedAthleteId] = useState<string>(athletes[0].id);
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);
  //const [selectedInterval, setSelectedInterval] = useState<'7' | '30' | '90'>('30');

  const athlete = athletes.find(a => a.id === selectedAthleteId)!;

  const screenWidth = Dimensions.get('window').width - 32;

  return (
    <ScrollView style={styles.container}>
      {/* Dropdown de atletas */}
      <FlatList
        data={athletes}
        horizontal
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.athleteButton,
              item.id === selectedAthleteId && styles.athleteSelected,
            ]}
            onPress={() => setSelectedAthleteId(item.id)}
          >
            <Text style={item.id === selectedAthleteId ? { fontWeight: 'bold' } : {}}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        style={{ marginBottom: 16 }}
        showsHorizontalScrollIndicator={false}
      />

      {/* Medidas atuais */}
      <View style={styles.currentMeasurements}>
        {athlete.currentMeasurements.map((m, idx) => (
          <View key={idx} style={styles.measureItem}>
            <Text style={styles.measureLabel}>{m.label}</Text>
            <View style={styles.measureValueContainer}>
              <Text style={styles.measureValue}>{m.value}</Text>
              {m.delta !== 0 && (
                <Ionicons
                  name={m.delta > 0 ? 'arrow-up-outline' : 'arrow-down-outline'}
                  size={20}
                  color={'black'}
                  style={{ marginLeft: 4 }}
                />
              )}
              {m.delta !== 0 && <Text style={styles.deltaText}>{Math.abs(m.delta)}</Text>}
            </View>
          </View>
        ))}
      </View>

      {/* Histórico */}
      <Text style={styles.subTitle}>Histórico</Text>
      {athlete.historicalMeasurements.map(h => (
        <TouchableOpacity
          key={h.date}
          onPress={() => setExpandedHistory(expandedHistory === h.date ? null : h.date)}
          style={styles.historyItem}
        >
          <Text style={styles.historyDate}>{h.date}</Text>
          {expandedHistory === h.date && (
            <View style={styles.historyDetails}>
              {h.measurements.map((m, idx) => (
                <Text key={idx}>{`${m.label}: ${m.value}`}</Text>
              ))}
            </View>
          )}
        </TouchableOpacity>
      ))}

      {/* Gráficos */}
      <Text style={styles.subTitle}>Gráficos</Text>
      <LineChart
        data={{
          labels: athlete.historicalMeasurements.map(h => h.date),
          datasets: [
            {
              data: athlete.historicalMeasurements.map(h => h.measurements.find(m => m.label === 'Peso')?.value || 0),
              color: () => '#1f77b4',
            },
          ],
        }}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(31, 119, 180, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0,0,0,${opacity})`,
          style: { borderRadius: 16 },
        }}
        style={{ marginVertical: 16, borderRadius: 16 }}
      />
    </ScrollView>
  );
}
