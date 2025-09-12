import React, { useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

interface Props {
  onFinish: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style?: any;
}

export default function LoginTransition({ onFinish, style }: Props) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const textFadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log('LoginTransition mounted - iniciando animações');
    
    // Sequência de animações
    const animationSequence = Animated.sequence([
      // Fade in do container (500ms)
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      // Fade in do texto (300ms)
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // Aguarda 1200ms para mostrar o texto
      Animated.delay(1200),
      // Fade out (400ms)
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(textFadeAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.9,
          duration: 400,
          useNativeDriver: true,
        }),
      ])
    ]);

    // Inicia a sequência
    animationSequence.start((finished) => {
      console.log('Animações terminadas:', finished);
      if (finished) {
        onFinish();
      }
    });

    // Cleanup - para cancelar animações se o componente for desmontado
    return () => {
      console.log('LoginTransition unmounting - cancelando animações');
      animationSequence.stop();
    };
  }, [fadeAnim, scaleAnim, textFadeAnim, onFinish]);

  return (
    <Animated.View 
      style={[
        styles.container, 
        style,
        { 
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }
      ]}
    >
      <View style={styles.content}>
        <Animated.View style={[styles.textContainer, { opacity: textFadeAnim }]}>
          <Text style={styles.mainText}>NO EXCUSES</Text>
          <View style={styles.divider} />
          <Text style={styles.subText}>JUST DO THE WORK</Text>
        </Animated.View>
        
        {/* Elementos decorativos */}
        <Animated.View style={[styles.topLine, { opacity: textFadeAnim }]} />
        <Animated.View style={[styles.bottomLine, { opacity: textFadeAnim }]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
  },
  textContainer: {
    alignItems: "center",
    paddingHorizontal: 40,
  },
  mainText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 2,
    textAlign: "center",
    marginBottom: 8,
  },
  divider: {
    width: 80,
    height: 2,
    backgroundColor: "#ffffff",
    marginVertical: 12,
  },
  subText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "400",
    letterSpacing: 1.5,
    textAlign: "center",
    marginTop: 8,
  },
  topLine: {
    position: 'absolute',
    top: -60,
    width: 200,
    height: 1,
    backgroundColor: "#ffffff",
    opacity: 0.6,
  },
  bottomLine: {
    position: 'absolute',
    bottom: -60,
    width: 200,
    height: 1,
    backgroundColor: "#ffffff",
    opacity: 0.6,
  },
});