document.addEventListener("DOMContentLoaded", () => {
    // Menampilkan scene pertama dan memastikan audio dimulai setelah klik
    document.getElementById("scene1").style.display = "flex";
    const backgroundAudio = document.getElementById("backgroundAudio");
    document.querySelector(".btn").addEventListener("click", () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play();
        }
    });
});

function typeText(elementId, text, delay = 100, callback) {
    const element = document.getElementById(elementId);
    element.innerHTML = ''; // Kosongkan isi elemen
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, delay);
        } else if (callback) {
            setTimeout(callback, 1000); // Jeda sebelum melanjutkan ke animasi berikutnya
        }
    }
    type();
}

function showInput() {
    transitionScene("scene1", "scene2");
    typeText("scene2-text", "Masukkan Nama Kamu:", 100, () => {
        document.getElementById("userName").focus(); // Fokus pada input
        typeText("scene2-subtext", "Silakan masukkan namamu di bawah ini.", 100); // Subtext
    });
}

function showBirthdayMessage() {
    const name = document.getElementById("userName").value;
    if (name) {
        transitionScene("scene2", "scene3");
        typeText("scene3-text", `Selamat Ulang Tahun, ${name}! ✨`, 100, () => {
            typeText("scene3-subtext", "Ayo klik untuk lanjut...", 100); // Subtext
        });
    }
}

function showStars() {
    transitionScene("scene3", "scene4");
    typeText("scene4-text", "Klik 5 Bintang di bawah!", 100, () => {
        typeText("scene4-subtext", "Rating kamu sangat berarti!", 100); // Subtext
    });
}

let starCount = 0;
function rateStar(star) {
    star.style.color = "#ffd700";
    star.style.opacity = "0"; // Menghilangkan bintang secara bertahap
    star.style.pointerEvents = "none"; // Mencegah klik ulang pada bintang yang sama
    starCount++;
    if (starCount === 5) {
        setTimeout(() => startScene5(), 500); // Memulai Scene 5 setelah 5 bintang diklik
    }
}

function startScene5() {
    transitionScene("scene4", "scene5"); // Pindah ke scene 5
    showSpecialMessage(); // Tampilkan pesan spesial
}

function showSpecialMessage() {
    const messages = [
        "Tunggu... Baca baik-baik ya!",
        "Selamat Berkurang umur di dunia, Ratna 🥳",
        "Makin tua aja ya ><",
        "Gimana jadi orang dewasa? Enak nggak? wkwk",
        "Semoga panjang umur dan bermanfaat!"
    ];

    typeTextWithDelay("scene5-text", messages, 1000, () => {
        document.querySelector(".btn").style.display = "block"; // Menampilkan tombol "Lanjut"
    });
}

function typeTextWithDelay(elementId, messages, delay, callback) {
    const element = document.getElementById(elementId);
    element.innerHTML = ''; // Kosongkan isi elemen
    let messageIndex = 0;

    function typeNextMessage() {
        if (messageIndex < messages.length) {
            typeText(elementId, messages[messageIndex], 100, () => {
                messageIndex++;
                setTimeout(typeNextMessage, delay); // Jeda sebelum menampilkan pesan berikutnya
            });
        } else if (callback) {
            setTimeout(callback, 1000); // Jeda sebelum melanjutkan ke animasi berikutnya
        }
    }
    typeNextMessage();
}

function showGift() {
    transitionScene("scene5", "scene6"); // Pindah ke scene 6
}

function showClosing() {
    transitionScene("scene7", "scene8");
    typeText("scene8-text", "Selamat Berkurang umur di dunia, Ratna! 🥳", 100, () => {
        typeText("scene8-subtext", "Semoga harimu penuh kebahagiaan!", 100); // Subtext
    });
}

function transitionScene(hideId, showId) {
    document.getElementById(hideId).classList.add("fade-out");
    setTimeout(() => {
        document.getElementById(hideId).style.display = "none";
        document.getElementById(showId).style.display = "flex";
        document.getElementById(showId).classList.remove("fade-out");
        document.getElementById(showId).classList.add("fade-in");
    }, 1000);
}
