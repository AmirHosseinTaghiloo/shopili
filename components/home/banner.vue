<template v-if="filterdBanners.length > 0">

    <div
        v-if="position == BannerPosition.بالای_اسلایدر"
        class="row mb-3"
    >
        <div class="col-12">

            <div class="main-banner">

                <transition name="slide" mode="out-in">
                    <img
                        :key="currentBanner"
                        :src="bannerImages[currentBanner]"
                        alt="banner"
                    />
                </transition>

            </div>

        </div>
    </div>

</template>


<script setup lang="ts">

import {
    ref,
    onMounted,
    onBeforeUnmount
} from 'vue'

import {
    BannerDto,
    BannerPosition
} from '~~/models/home/homeDataDto'


const props = defineProps<{
    banners: BannerDto[],
    position: BannerPosition
}>()


const filterdBanners = props.banners.filter(
    f => f.position == props.position
)


// تصاویر بنر
import banner5 from '@/assets/images/banners/b5.png'
import banner2 from '@/assets/images/banners/b2.png'



const bannerImages = [
    banner2,
    banner5
]


const currentBanner = ref(0)

let sliderInterval: ReturnType<typeof setInterval> | null = null


onMounted(() => {

    if (
        props.position === BannerPosition.بالای_اسلایدر &&
        bannerImages.length > 1
    ) {

        sliderInterval = setInterval(() => {

            currentBanner.value =
                (currentBanner.value + 1) %
                bannerImages.length

        }, 4000)

    }

})


onBeforeUnmount(() => {

    if (sliderInterval) {
        clearInterval(sliderInterval)
    }

})

</script>


<style scoped>

.main-banner {
    width: 100%;
    overflow: hidden;
    border-radius: 16px;
}

.main-banner img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
}


/* انیمیشن اسلاید */

.slide-enter-active,
.slide-leave-active {
    transition:
        transform 0.7s ease,
        opacity 0.7s ease;
}

.slide-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
}


@media (max-width: 768px) {

    .main-banner {
        border-radius: 10px;
    }

}

</style>