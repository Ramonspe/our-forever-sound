# Our Forever Page

# OBJETIVO

Crie um site romântico de PÁGINA ÚNICA (One Page), 100% front-end estático: SEM backend, SEM login, SEM banco de dados, SEM Supabase, SEM formulários. É um presente de 11 meses de namoro. Deve ser elegante, fluido e emocionante, com animações suaves. Totalmente responsivo (mobile-first, perfeito em celular e desktop).

# IDENTIDADE VISUAL (tema claro, delicado e clássico)

- Estilo romântico, arejado e sofisticado, com fundo claro (light theme).

- Paleta (use como CSS variables):

  Fundo #FFF6F0 (creme) | Rosa (destaques) #E0708D | Vinho (títulos/ênfase) #B23A5A | Dourado (linhas/detalhes) #D9A441 | Texto #3B2B30

- Fotos com molduras de cantos arredondados e sombra suave, para destacarem sobre o fundo claro.

- Fontes (Google Fonts): títulos e frases em "Dancing Script" (manuscrito), corpo/datas em "Inter".

- Coraçõezinhos flutuando suavemente pelo fundo do site inteiro, em tons de rosa (#E0708D) e dourado (#D9A441), opacidade baixa (discretos, contínuos, tamanhos variados).

# TELA DE ENTRADA (essencial para o áudio funcionar)

- Ao abrir, mostre uma tela cheia (fundo creme) com um disco de vinil girando devagar e o texto "Toque para começar 💛" em vinho/rosa.

- Ao clicar/tocar em qualquer lugar dessa tela: dispare uma explosão de corações, inicie a música e revele o site com fade-in. Esse clique é o que libera o áudio no navegador — sem ele o som não toca.

# SISTEMA DE MÚSICA (com plano B automático)

- Player controlado por um ícone de DISCO DE VINIL fixo no canto superior direito.

- Toque as músicas via YouTube IFrame Player API, com o player do YouTube ESCONDIDO (fora da tela / tamanho 0 / opacity 0 / pointer-events none). A pessoa só vê o disquinho; o som vem do YouTube por trás.

- O disco GIRA enquanto toca e PARA de girar quando pausado/silenciado.

- Controles: clicar no disco = play/pause; botão de silenciar (mute); um seletor para trocar de música (lista com os nomes ou setas anterior/próxima), mostrando o nome da música atual.

- A primeira música ("Heavy Is the Crown") começa a tocar após o clique na tela de entrada.

- Músicas (YouTube video IDs, nesta ordem):

  1. Heavy Is the Crown – Linkin Park → ZAt8oxY0GQo

  2. Velha Infância – Tribalistas → zwqrmEMB0wc

  3. Eu Me Apaixonei – Vitinho Imperador → HD2sMiAwpCQ

  4. Ainda Bem – Thiaguinho → YuByvjwo-HQ

  5. Eu Só Quero Um Xodó – Dominguinhos → TPm6YnDNyj0

  6. Por Você – Barão Vermelho → QpSOWQwpaBI

- PLANO B OBRIGATÓRIO (degradação graciosa): trate o evento de erro do player (onError) E um timeout (se a música não começar a tocar em ~4 segundos). Se houver qualquer erro (150/153/101/100) ou não tocar: ESCONDA completamente o player quebrado (nunca mostre quadrado cinza de erro) e transforme o disco num botão "🎵 Ouvir nossa playlist" que abre, em nova aba, esta URL:

  https://www.youtube.com/watch_videos?video_ids=ZAt8oxY0GQo,zwqrmEMB0wc,HD2sMiAwpCQ,YuByvjwo-HQ,TPm6YnDNyj0,QpSOWQwpaBI

- O site deve ficar perfeito mesmo se a música não tocar. A música é um EXTRA e nunca pode quebrar o layout.

# CONTEÚDO (One Page, na ordem abaixo, revelado conforme a rolagem)

Cada seção surge com animação suave ao entrar na tela (fade-in + leve slide para cima; use IntersectionObserver). Todas as imagens com loading="lazy" para o site abrir rápido no celular.

Regra de layout: o HERO e o BLOCO FINAL são centralizados (o final é o "oposto" do hero — hero abre, final encerra). Os blocos com foto do meio são SIMPLES (uma foto + frase + data) e alternam o lado da foto: esquerda, direita, esquerda, direita... Há também um bloco só de FRASE (sem foto) perto do fim. No celular, tudo vira coluna única.

Ordem das seções:

1. HERO (primeira tela): FOTO grande do casal [foto: hero], centralizada. Logo abaixo, o texto "Eu te amo há mais de:" em destaque (Dancing Script) e, embaixo dele, um CONTADOR AO VIVO atualizando a cada segundo no formato "X dias, Y horas, Z minutos, W segundos". Data de início: 20/09/2025 às 00:00.

2. Bloco SIMPLES [foto: conjunto1] (foto à esquerda)

   Frase: "Começou me entregando às armadilhas de amor 🤣"

   Data: 25/07/2025

3. Bloco SIMPLES [foto: ibira] (foto à direita)

   Frase: "Passei a ficar ansioso para que conseguisse dar um beijo certo. 🤣"

   Data: 23/08/2025

4. Bloco SIMPLES [foto: pedido de namoro] (foto à esquerda)

   Frase: "Até que chegou o dia que você disse o primeiro SIM."

   Data: 29/09/2025

5. Bloco SIMPLES [foto: flor1] (foto à direita)

   Frase: "Então seu encanto de girassol passou 1 mês oficial comigo. 🌻"

   Data: 30/10/2025

6. Bloco SIMPLES [foto: anel2] (foto à esquerda)

   Frase: "Até que eu dei o anel no dia que foi nosso primeiro assunto."

   Data: 08/11/2025

7. Bloco SIMPLES [foto: intimidade] (foto à direita)

   Frase: "Então nossa intimidade só evoluiu 🤣"

   Data: 06/12/2025

8. Bloco SIMPLES [foto: amadureceu] (foto à esquerda)

   Frase: "Nosso amor amadureceu"

   Data: 12/12/2025

9. Bloco SIMPLES [foto: melhoraram] (foto à direita)

   Frase: "E as coisas só melhoraram"

   Data: 20/12/2025

10. Bloco APENAS DE FRASE (sem foto): um respiro/crescendo antes do encerramento. Somente texto centralizado, ocupando a largura, com bastante espaço em volta e alguns corações ao redor. Frase em destaque (Dancing Script): "De modo que passei a te amar incondicionalmente". Data embaixo (Inter, menor): 16/05/2026.

11. BLOCO FINAL (encerramento, centralizado como oposto do hero): FOTO [foto: sempre1], centralizada.

    Frase (em destaque, Dancing Script, maior): "Para todo o sempre! Te amo, Raíla ❤️"

# DETALHES FINAIS

- Corações e pequenas animações ao longo de toda a rolagem; transições suaves entre seções.

- Frases em Dancing Script; datas menores, em Inter, logo abaixo de cada frase.

- No celular: fotos em coluna única; contador e controles se adaptam; nada corta ou vaza.

- Todas as imagens otimizadas e com lazy loading; performance leve.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://our-forever-sound.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/797afae4-e01d-49d4-a163-dceb2c775566).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
