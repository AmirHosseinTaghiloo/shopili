<template>
  <div class="blog-page Vue-Toastification__toast-body">

    <!-- هدر بزرگ -->
    <section class="hero">
      <h1>مجله آنلاین ایرانی</h1>
      <p>جایی برای خواندن بهترین مقالات فارسی در حوزه تکنولوژی، سبک زندگی و توسعه فردی</p>
    </section>
        <!-- Persian Calendar -->
    <section class="calendar-section">
      <div class="calendar-heading">
        <span>برنامه‌ریزی بهتر</span>

        <h2>
          تقویم شمسی
        </h2>

        <p>
          تاریخ‌های مهمت رو همیشه دم دست داشته باش
        </p>
      </div>

      <PersianCalendar />
    </section>
    <!-- لیست پست‌ها -->
    <section class="posts">
      <div
        v-for="post in posts"
        :key="post.slug"
        class="post-card"
      >
        <div class="image-wrapper">
          <img :src="post.image" class="post-img" />
        </div>

        <div class="post-body">
          <span class="category">{{ post.category }}</span>
          <h2>{{ post.title }}</h2>
          <p class="excerpt">{{ post.excerpt }}</p>

          <div class="meta-row">
            <span class="date">{{ post.date }}</span>
            <button class="btn">مطالعه</button>
          </div>
        </div>
  

      </div>
    </section>
    

  </div>
</template>

<script setup>
import PersianCalendar from "~/components/home/PersianCalendar.vue"
const posts = [
  {
    title: 'چطور با Nuxt یک وبلاگ حرفه‌ای بسازیم؟',
    slug: 'nuxt-pro-blog',
    date: '۳ تیر ۱۴۰۵',
    category: 'برنامه‌نویسی',
    excerpt: 'در این مقاله یاد می‌گیریم چطور یک وبلاگ مدرن، سریع و زیبا با Nuxt طراحی کنیم.',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg'
  },
  {
    title: '۱۰ عادت روزانه برای افزایش تمرکز',
    slug: 'daily-focus-habits',
    date: '۲۹ خرداد ۱۴۰۵',
    category: 'توسعه فردی',
    excerpt: 'اگر دنبال افزایش تمرکز و بهره‌وری هستی، این ۱۰ عادت می‌تونه زندگیت رو تغییر بده.',
    image: 'https://images.pexels.com/photos/261949/pexels-photo-261949.jpeg'
  },
  {
    title: 'زندگی یک برنامه‌نویس در ایران',
    slug: 'dev-life-iran',
    date: '۲۵ خرداد ۱۴۰۵',
    category: 'سبک زندگی',
    excerpt: 'تجربه‌های واقعی از چالش‌ها، فرصت‌ها و روزمرگی‌های یک برنامه‌نویس ایرانی.',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg'
  }
]
</script>

<style scoped>
.blog-page {
  direction: rtl;
  font-family: "Vazirmatn", sans-serif;
  padding: 2rem;
  max-width: 1100px;
  margin: auto;
}

/* هدر بزرگ */
.hero {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(to bottom, rgb(111, 0, 255), rgb(255, 0, 242));
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

/* کارت پست‌ها */
.posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.post-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.06);
  transition: 0.25s;
  cursor: pointer;
}

.post-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 30px rgba(0,0,0,0.1);
}

.image-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.post-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: 0.4s;
}

.post-card:hover .post-img {
  transform: scale(1.08);
}

.post-body {
  padding: 1.2rem 1.4rem;
}

.category {
  font-size: 0.8rem;
  color: linear-gradient(to bottom, rgb(111, 0, 255), rgb(255, 0, 242));
  font-weight: 600;
}

.post-body h2 {
  margin: 0.4rem 0 0.6rem;
  font-size: 1.2rem;
  font-weight: 700;
}

.excerpt {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.meta-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.date {
  font-size: 0.8rem;
  color: #777;
}

.btn {
  background: linear-gradient(to bottom, rgb(111, 0, 255), rgb(255, 0, 242));
  color: #fff;
  border: none;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: 0.2s;
}

.btn:hover {
  background: linear-gradient(to bottom,rgb(111, 0, 255));
  
}


/* calender */
.calendar-section {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;

  margin-top: 80px;
  margin-bottom: 80px;

  padding: 60px 20px;

  overflow: hidden;

  border-radius: 40px;

  background:
    radial-gradient(
      circle at 80% 20%,
      rgba(99, 102, 241, 0.08),
      transparent 35%
    ),
    radial-gradient(
      circle at 20% 80%,
      rgba(168, 85, 247, 0.07),
      transparent 35%
    );
}

/* Heading */

.calendar-heading {
  position: relative;

  text-align: center;

  margin-bottom: 30px;
}

.calendar-heading span {
  display: inline-flex;

  margin-bottom: 8px;

  padding: 6px 12px;

  border: 1px solid rgba(99, 102, 241, 0.12);
  border-radius: 999px;

  background: rgba(99, 102, 241, 0.06);

  color: #6366f1;

  font-size: 11px;
  font-weight: 800;
}

.calendar-heading h2 {
  margin: 0;

  font-size: 30px;
  font-weight: 950;

  letter-spacing: -1px;

  color: #111827;
}

.calendar-heading p {
  margin-top: 8px;

  color: #94a3b8;

  font-size: 13px;
}

/* Responsive */

@media (max-width: 640px) {
  .calendar-section {
    margin-top: 50px;
    margin-bottom: 50px;

    padding: 35px 10px;

    border-radius: 28px;
  }

  .calendar-heading h2 {
    font-size: 24px;
  }

  .calendar-heading p {
    font-size: 12px;
  }
}



</style>
