<!-- pages/posts/[slug].vue -->
<template>
  <article v-if="post" class="post">
    <h1 class="post-title">{{ post.title }}</h1>
    <p class="post-meta">
      {{ post.date }} • {{ post.category }}
    </p>
    <img v-if="post.image" :src="post.image" :alt="post.title" class="post-image" />
    <div class="post-content">
      <p>
        اینجا می‌تونی محتوای کامل پست رو قرار بدی. مثلاً چند پاراگراف درباره موضوع، تجربه شخصی، کد نمونه و هر چیزی که دوست داری.
      </p>
      <p>
        برای مدیریت محتوا می‌تونی بعداً از Markdown، CMS (مثل Strapi، Directus، Sanity) یا حتی فایل‌های JSON استفاده کنی.
      </p>
    </div>
    <NuxtLink to="/" class="back-link">← برگشت به صفحه اصلی</NuxtLink>
  </article>

  <p v-else>پست مورد نظر پیدا نشد.</p>
</template>

<script setup lang="ts">
const route = useRoute()

const allPosts = [
  {
    title: 'چطور با Vue و Nuxt یه وبلاگ ایرانی بسازیم؟',
    slug: 'vue-nuxt-iranian-blog',
    date: '۳ تیر ۱۴۰۵',
    category: 'برنامه‌نویسی',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg'
  },
  {
    title: 'چای ایرانی یا قهوه؟ کدوم برای کدنویسی بهتره؟',
    slug: 'tea-or-coffee-for-coding',
    date: '۲۹ خرداد ۱۴۰۵',
    category: 'سبک زندگی',
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg'
  },
  {
    title: 'چند تا نکته برای ریموت کار کردن از ایران',
    slug: 'remote-work-from-iran',
    date: '۲۵ خرداد ۱۴۰۵',
    category: 'کار و شغل',
    image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg'
  }
]

const post = computed(() =>
  allPosts.find(p => p.slug === route.params.slug)
)
</script>

<style scoped>
.post-title {
  margin: 0 0 0.4rem;
  font-size: 1.7rem;
}
.post-meta {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: #777;
}
.post-image {
  width: 100%;
  max-height: 380px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1.5rem;
}
.post-content {
  font-size: 0.98rem;
  line-height: 2;
  color: #333;
  margin-bottom: 2rem;
}
.back-link {
  font-size: 0.9rem;
  color: #e63946;
  font-weight: 600;
}
</style>
