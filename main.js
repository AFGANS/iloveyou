// Memastikan DOM telah dimuat sepenuhnya sebelum menjalankan script
document.addEventListener('DOMContentLoaded', () => {
  // --- Mengambil elemen-elemen dari DOM ---
  const showLetterBtn = document.getElementById('showLetterBtn');
  const letterContainer = document.getElementById('letterContainer');
  const rolledLetter = document.getElementById('rolledLetter');
  const letterContent = document.getElementById('letterContent');
  const ribbon = document.querySelector('.ribbon');
  const romanticMusic = document.getElementById('romanticMusic');
  const finalMessage = document.getElementById('finalMessage');
  const countdownTimer = document.getElementById('countdownTimer');
  
  const letterHeader = document.getElementById('letterHeader');
  const letterBody = document.getElementById('letterBody');
  
  // --- Konten surat asli ---
  const headerText = "Untuk Aurell💕";
  const bodyText = `Kamu adalah simfoni yang indah,\n` +
    `Membawa harmoni dan keindahan dalam hidupku.\n` +
    `Dengan nada yang lembut, kamu membuatku merasa tenang,\n` +
    `Dan dengan irama yang cepat, kamu membuatku merasa hidup.\n\n` +
    `Kamu adalah pelangi setelah hujan,\n` +
    `Membawa warna dan keindahan dalam hidupku.\n` +
    `Dengan kepribadian yang unik dan ceria,\n` +
    `Kamu membuatku merasa bahagia dan bersemangat.`;
  
  // --- Konfigurasi dan variabel state ---
  let isLetterOpen = false;
  
  // --- Fungsi untuk efek ketikan ---
  function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.innerHTML = ''; // Pastikan elemen kosong sebelum memulai
    function type() {
      if (i < text.length) {
        if (text.charAt(i) === '\n') {
          element.innerHTML += '<br>';
        } else {
          element.innerHTML += text.charAt(i);
        }
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        callback();
      }
    }
    type();
  }
  
  // --- Event Listeners ---
  showLetterBtn.addEventListener('click', () => {
    if (isLetterOpen) return;
    
    showLetterBtn.classList.add('hidden');
    letterContainer.classList.remove('hidden');
    
    romanticMusic.play().catch(error => { console.error("Autoplay gagal.", error); });
    
    rolledLetter.classList.add('initial-visible');
  });
  
  rolledLetter.addEventListener('click', () => {
    if (isLetterOpen) return;
    isLetterOpen = true;
    
    ribbon.classList.add('hidden');
    rolledLetter.style.cursor = 'default';
    
    rolledLetter.classList.remove('initial-visible');
    rolledLetter.classList.add('open');
    
    // Menambahkan kelas visible untuk memunculkan container konten
    setTimeout(() => {
      letterContent.classList.add('visible');
      
      // Mulai efek ketikan untuk header, lalu body
      typeWriter(letterHeader, headerText, 70, () => {
        typeWriter(letterBody, bodyText, 40, () => {
          // Setelah semua selesai diketik, mulai hitungan mundur
          startCountdown(8);
        });
      });
    }, 1200); // Sesuaikan dengan durasi animasi CSS
  });
  
  function startCountdown(duration) {
    countdownTimer.classList.remove('hidden');
    let timeLeft = duration;
    countdownTimer.textContent = `Waktu membaca akan berakhir dalam ${timeLeft} detik`;
    
    const timerInterval = setInterval(() => {
      timeLeft--;
      countdownTimer.textContent = `Waktu membaca akan berakhir dalam ${timeLeft} detik`;
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        closeLetter();
      }
    }, 1000);
  }
  
  function closeLetter() {
    if (!isLetterOpen) return;
    isLetterOpen = false;
    
    letterContent.classList.remove('visible');
    countdownTimer.classList.add('hidden');
    
    rolledLetter.classList.remove('open');
    rolledLetter.classList.add('closed');
    
    setTimeout(() => {
      letterContainer.classList.add('hidden');
      finalMessage.classList.remove('hidden');
      finalMessage.classList.add('visible');
      
      setTimeout(() => {
        romanticMusic.pause();
        window.location.href = 'https://afgans.github.io/lagu1/pink heart.html';
      }, 4000);
      
    }, 1500);
  }
});