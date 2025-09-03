import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { styles } from './styles/MeasurementsScreen.styles';

interface Measurement {
  label: string;
  value: number;
  delta: number; // diferença desde a última medição
}

interface HistoricalMeasurement {
  date: string;
  measurements: Measurement[];
}

const currentMeasurements: Measurement[] = [
  { label: 'Altura', value: 180, delta: 0 },
  { label: 'Peso', value: 75, delta: 1 },
  { label: 'Massa Gorda', value: 20, delta: -1 },
  { label: 'Massa Muscular', value: 35, delta: 0.5 },
  { label: 'Gordura Visceral', value: 10, delta: -0.3 },
];

const historicalMeasurements: HistoricalMeasurement[] = [
  { date: '2025-09-01', measurements: currentMeasurements },
  { date: '2025-08-01', measurements: currentMeasurements.map(m => ({ ...m, value: m.value - 1 })) },
];

export default function MeasurementsScreen() {
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<'7' | '30' | '90'>('30');

  const screenWidth = Dimensions.get('window').width - 32;

  return (
    <ScrollView style={styles.container}>
      {/* Topo */}
      {/* Medidas atuais */}
      <View style={styles.currentMeasurements}>
        {currentMeasurements.map((m, idx) => (
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
      {historicalMeasurements.map(h => (
        <TouchableOpacity key={h.date} onPress={() => setExpandedHistory(expandedHistory === h.date ? null : h.date)} style={styles.historyItem}>
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
          labels: historicalMeasurements.map(h => h.date),
          datasets: [
            {
              data: historicalMeasurements.map(h => h.measurements.find(m => m.label === 'Peso')?.value || 0),
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
