<template>
  <div class="row g-3">

    <!-- بنر اول -->
    <div class="col-md-6 col-12">
      <div class="small-banner">
        <img
          src="@/assets/images/banners/b3.png"
          alt="banner"
        >
      </div>
    </div>

    <!-- بنر دوم -->
    <div class="col-md-6 col-12">
      <div class="small-banner">
        <img
          src="@/assets/images/banners/b3.png"
          alt="banner"
        >
      </div>
    </div>

  </div>
</template>

<style scoped>

.small-banner {
  width: 100%;
  overflow: hidden;
  border-radius: 14px;
}

.small-banner img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.4s ease;
}

/* افکت Hover */

.small-banner:hover img {
  transform: scale(1.04);
}

/* موبایل */

@media (max-width: 768px) {
  .small-banner {
    border-radius: 10px;
  }
}

</style>