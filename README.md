# Jogo do Alfabeto

**Descrição:**

O Jogo do Alfabeto é uma aplicação simples e divertida que desafia os jogadores a identificar a posição relativa de letras do alfabeto. O jogo exibe uma letra e o jogador deve indicar se ela vem antes ou depois de outra letra. Cada acerto soma um ponto, e ao final do jogo, o score total do jogador é mostrado.

**Objetivo:**

- Aparece uma letra na tela.
- O jogador deve dizer se a letra aparece antes ou depois de outra letra (exemplo: "A" vem antes ou depois de "Z"?).
- Cada acerto garante um ponto.
- Quando o jogador errar, o jogo termina e o score final é exibido.

**Como rodar o Jogo:**

1. Clone o repositório do jogo:

   ```bash
   git clone https://github.com/DanielFreitassc/JogoDoAlfabeto
   ```

2. Entre no diretório do repositório clonado:

   ```bash
   cd JogoDoAlfabeto
   ```

3. Certifique-se de que o Docker está instalado no seu sistema.

4. Execute o seguinte comando para iniciar o jogo utilizando Docker:

   ```bash
   docker compose up -d
   ```

5. Acesse o jogo no navegador:

   ```
   http://localhost
   ```

**Tecnologias Utilizadas:**

- Docker
- React
- Springboot
