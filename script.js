class PermainanTebakAngka {
    constructor() {
        this.targetNumber = this.generateTargetNumber();
        this.maxGuesses = 6;
        this.currentGuesses = 0;
        this.guessesContainer = document.getElementById('guesses-container');
        this.messageElement = document.getElementById('message');
        this.attemptsLeftElement = document.getElementById('attempts-left');
        this.gameOverModal = document.getElementById('game-over-modal');
        this.setupEventListeners();
    }

    generateTargetNumber() {
        let digits = [0,1,2,3,4,5,6,7,8,9];
        let target = [];
        for (let i = 0; i < 5; i++) {
            let randomIndex = Math.floor(Math.random() * digits.length);
            target.push(digits[randomIndex]);
            digits.splice(randomIndex, 1);
        }
        return target.join('');
    }

    setupEventListeners() {
        const submitBtn = document.getElementById('submit-btn');
        const guessInput = document.getElementById('guess-input');

        submitBtn.addEventListener('click', () => this.prosesTebakanAwal());

        guessInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.prosesTebakanAwal();
            }
            if (!/^\d$/.test(event.key)) {
                event.preventDefault();
            }
        });

        document.querySelector('.btn-restart').addEventListener('click', () => this.ulangPermainan());
        document.querySelector('.btn-exit').addEventListener('click', () => this.keluarPermainan());
    }

    prosesTebakanAwal() {
        const guessInput = document.getElementById('guess-input');
        const tebakan = guessInput.value;

        if (tebakan.length !== 5 || new Set(tebakan).size !== 5) {
            this.tampilkanPesan('Mohon masukkan angka 5 digit yang berbeda!', 'error');
            return;
        }

        this.currentGuesses++;
        this.perbaruiSisaPercobaan();
        this.evaluasiTebakan(tebakan);
        guessInput.value = '';

        if (tebakan === this.targetNumber) {
            this.tampilkanModalGameOver(true);
        } else if (this.currentGuesses >= this.maxGuesses) {
            this.tampilkanModalGameOver(false);
        }
    }

    perbaruiSisaPercobaan() {
        const sisaPercobaan = this.maxGuesses - this.currentGuesses;
        this.attemptsLeftElement.textContent = `Sisa Percobaan: ${sisaPercobaan}`;
    }

    evaluasiTebakan(tebakan) {
        const barisanTebakan = document.createElement('div');
        barisanTebakan.classList.add('guess-row');

        for (let i = 0; i < 5; i++) {
            const elemenDigit = document.createElement('div');
            elemenDigit.classList.add('guess-digit');
            elemenDigit.textContent = tebakan[i];

            if (tebakan[i] === this.targetNumber[i]) {
                elemenDigit.classList.add('correct');
            } else if (this.targetNumber.includes(tebakan[i])) {
                elemenDigit.classList.add('partial');
            } else {
                elemenDigit.classList.add('incorrect');
            }

            barisanTebakan.appendChild(elemenDigit);
        }

        this.guessesContainer.appendChild(barisanTebakan);
    }

    tampilkanModalGameOver(menang) {
        const judulGameOver = document.getElementById('game-over-title');
        const pesanGameOver = document.getElementById('game-over-message');

        if (menang) {
            judulGameOver.textContent = 'Selamat!';
            pesanGameOver.textContent = `Anda berhasil menebak angka ${this.targetNumber}!`;
        } else {
            judulGameOver.textContent = 'Permainan Berakhir';
            pesanGameOver.textContent = `Angka yang benar adalah ${this.targetNumber}. Ingin mencoba lagi?`;
        }

        this.gameOverModal.style.display = 'flex';
        this.nonAktifkanPermainan();
    }

    ulangPermainan() {
        this.guessesContainer.innerHTML = '';
        this.messageElement.textContent = '';
        this.currentGuesses = 0;
        this.perbaruiSisaPercobaan();
        this.targetNumber = this.generateTargetNumber();
        document.getElementById('submit-btn').disabled = false;
        document.getElementById('guess-input').disabled = false;
        this.gameOverModal.style.display = 'none';
    }

    keluarPermainan() {
        if (confirm("Anda yakin ingin keluar dari permainan?")) {
            window.close();
            window.location.href = "about:blank";
        }
    }

    tampilkanPesan(pesan, tipe) {
        this.messageElement.textContent = pesan;
        this.messageElement.style.color = tipe === 'error' ? 'red' : 'black';
    }

    nonAktifkanPermainan() {
        document.getElementById('submit-btn').disabled = true;
        document.getElementById('guess-input').disabled = true;
    }
}

document.addEventListener('DOMContentLoaded', () => new PermainanTebakAngka());
