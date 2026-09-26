<template>
  <div class="about-page Vue-Toastification__toast-body">

    <!-- هدر بزرگ -->
    <section class="hero">
      <h1>درباره ما</h1>
      <p>ما اینجاییم تا بهترین تجربه‌ی محتوای فارسی را برای شما بسازیم</p>
    </section>

    <!-- بخش معرفی -->
    <section class="intro">
      <h2>ما که هستیم؟</h2>
      <p>
        ما یک تیم کوچک اما پرانرژی هستیم که با عشق به تولید محتوا، تکنولوژی و طراحی،
        این وبسایت را ساختیم. هدف ما ایجاد فضایی حرفه‌ای، قابل اعتماد و الهام‌بخش برای
        کاربران فارسی‌زبان است تا بتوانند بهترین تجربه را از مطالعه و یادگیری داشته باشند.
      </p>
    </section>

    <!-- ویژگی‌ها -->
    <section class="features">
      <div class="feature-card">
        <h3>کیفیت بالا</h3>
        <p>تمام تلاش ما ارائه محتوای دقیق، معتبر و ارزشمند است.</p>
      </div>

      <div class="feature-card">
        <h3>تجربه کاربری عالی</h3>
        <p>طراحی مدرن، سرعت بالا و رابط کاربری ساده، اولویت ماست.</p>
      </div>

      <div class="feature-card">
        <h3>تیم متخصص</h3>
        <p>ما از افراد باتجربه در حوزه‌های مختلف تشکیل شده‌ایم.</p>
      </div>
    </section>

    <!-- بخش پایانی -->
    <section class="mission">
      <h2>ماموریت ما</h2>
      <p>
        ما باور داریم که محتوای خوب می‌تواند زندگی افراد را تغییر دهد.  
        به همین دلیل، هر روز تلاش می‌کنیم تا بهتر شویم، بیشتر یاد بگیریم  
        و تجربه‌ای متفاوت برای شما بسازیم.
      </p>
    </section>

  </div>
</template>

<style scoped>
.about-page {
  direction: rtl;
  font-family: "Vazirmatn", sans-serif;
  padding: 2rem;
  max-width: 1000px;
  margin: auto;
}

/* هدر */
.hero {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #e63946, #7b7fff);
  color: #fff;
  border-radius: 20px;
  margin-bottom: 3rem;
}

.hero h1 {
  margin: 0;
  font-size: 2.4rem;
  font-weight: 700;
}

.hero p {
  margin-top: 0.8rem;
  font-size: 1.1rem;
  opacity: 0.9;
}

/* معرفی */
.intro {
  text-align: center;
  margin-bottom: 3rem;
}

.intro h2 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

.intro p {
  font-size: 1rem;
  color: #444;
  line-height: 2;
}

/* ویژگی‌ها */
.features {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.feature-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
  transition: 0.25s;
}

.feature-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 30px rgba(0,0,0,0.1);
}

.feature-card h3 {
  margin: 0 0 0.6rem;
  color: #e63946;
  font-size: 1.2rem;
}

.feature-card p {
  color: #555;
  line-height: 1.8;
}

/* ماموریت */
.mission {
  text-align: center;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
}

.mission h2 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
}

.mission p {
  font-size: 1rem;
  color: #444;
  line-height: 2;
}
</style>
