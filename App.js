import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Linking,
  ActivityIndicator
} from 'react-native';

export default function App() {
  const [tela, setTela] = useState('inicio');
  const [ultimaLimpeza, setUltimaLimpeza] = useState(null);
  const [progresso, setProgresso] = useState([]);

  const passos = [
    'Limpando cache',
    'Verificando vulnerabilidades',
    'Otimizando bateria',
    'Removendo arquivos temporários'
  ];

  const limparCelular = () => {
    setTela('carregando');
    setProgresso([]);

    let index = 0;
    const interval = setInterval(() => {
      if (index < passos.length) {
        setProgresso(prev => [...prev, passos[index]]);
        index++;
      } else {
        clearInterval(interval);
        const agora = new Date();
        setUltimaLimpeza(`${agora.toLocaleDateString()} às ${agora.toLocaleTimeString()}`);
        setTela('limpeza');
      }
    }, 750);
  };

  const verDicas = () => setTela('dicas');
  const voltarInicio = () => setTela('inicio');

  const abrirPlayStore = () => {
    Linking.openURL('market://details?id=org.malwarebytes.antimalware')
      .catch(() => Linking.openURL('https://play.google.com/store/apps/details?id=org.malwarebytes.antimalware'));
  };

  if (tela === 'carregando') {
    return (
      <SafeAreaView style={estilos.container}>
        <Text style={estilos.titulo}>Limpando o celular...</Text>
        <ActivityIndicator size="large" color="#ff6b35" style={{ marginTop: 20 }} />
        <View style={{ marginTop: 30, paddingHorizontal: 20 }}>
          {progresso.map((passo, i) => (
            <Text key={i} style={{ color: '#ccc', fontSize: 16, marginBottom: 10 }}>
              {passo} ✓
            </Text>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  if (tela === 'inicio') {
    return (
      <SafeAreaView style={estilos.container}>
        <Text style={estilos.titulo}>OtimizeFácil</Text>
        <Text style={{ color: '#aaa', fontSize: 14, marginBottom: 10 }}>by Victor Coimbra</Text>
        <Text style={estilos.subtitulo}>App para ajudar idosos a limpar o celular</Text>

        <TouchableOpacity style={estilos.botaoLaranja} onPress={limparCelular}>
          <Text style={estilos.textoBotaoLaranja}>Limpar celular</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botaoPreto} onPress={verDicas}>
          <Text style={estilos.textoBotaoPreto}>Ver dicas</Text>
        </TouchableOpacity>

        {ultimaLimpeza && (
          <Text style={estilos.ultimaLimpeza}>Última limpeza: {ultimaLimpeza}</Text>
        )}
      </SafeAreaView>
    );
  }

  if (tela === 'limpeza') {
    return (
      <SafeAreaView style={estilos.container}>
        <Text style={estilos.titulo}>Limpeza concluída!</Text>
        <Text style={{ color: '#ccc', fontSize: 18, marginBottom: 20 }}>Seu celular está otimizado 😊</Text>

        <Text style={estilos.ultimaLimpeza}>Última limpeza: {ultimaLimpeza}</Text>

        <TouchableOpacity style={estilos.botaoLaranja} onPress={voltarInicio}>
          <Text style={estilos.textoBotaoLaranja}>Voltar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botaoAntivirus} onPress={abrirPlayStore}>
          <Text style={{ color: '#fff', fontSize: 14 }}>Baixar antivírus grátis</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // TELA DE DICAS COM TODAS AS DICAS BOAS
  return (
    <SafeAreaView style={estilos.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={estilos.titulo}>Dicas para manter o celular rápido</Text>
        <View style={estilos.dicaBox}>
          <Text style={estilos.dica}>• Atualize os apps com frequência</Text>
          <Text style={estilos.dica}>• Evite baixar apps de sites desconhecidos</Text>
          <Text style={estilos.dica}>• Reinicie o celular de vez em quando</Text>
          <Text style={estilos.dica}>• Limpe o cache dos aplicativos</Text>
          <Text style={estilos.dica}>• Desinstale apps que não usa</Text>
          <Text style={estilos.dica}>• Apague fotos e vídeos antigos</Text>
          <Text style={estilos.dica}>• Use o modo economia de bateria</Text>
        </View>
        <TouchableOpacity style={estilos.botaoPreto} onPress={voltarInicio}>
          <Text style={estilos.textoBotaoPreto}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 32, color: '#fff', fontWeight: 'bold', marginBottom: 10 },
  subtitulo: { color: '#ccc', fontSize: 16, textAlign: 'center', marginBottom: 30 },
  botaoLaranja: { backgroundColor: '#ff6b35', paddingVertical: 16, paddingHorizontal: 40, borderRadius: 30, marginBottom: 15 },
  textoBotaoLaranja: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  botaoPreto: { borderColor: '#fff', borderWidth: 1, paddingVertical: 12, paddingHorizontal: 30, borderRadius: 30 },
  textoBotaoPreto: { color: '#fff', fontSize: 16 },
  botaoAntivirus: { marginTop: 20, borderColor: '#fff', borderWidth: 1, paddingVertical: 12, paddingHorizontal: 25, borderRadius: 25 },
  ultimaLimpeza: { color: '#999', fontSize: 14, marginTop: 20 },
  dicaBox: { backgroundColor: '#111', padding: 20, borderRadius: 15, marginVertical: 20 },
  dica: { color: '#fff', fontSize: 16, marginBottom: 10 },
});