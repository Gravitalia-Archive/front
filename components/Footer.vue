<template>
    <div :class="absolute ? 'absolute bottom-0 w-full p-3 bg-stone-100 dark:bg-zinc-800 flex justify-center items-center space-x-3 text-[14px] font-medium text-[#666] dark:text-white' : 'bottom-0 w-full p-3 bg-stone-100 dark:bg-zinc-800 flex justify-center items-center space-x-3 text-[14px] font-medium text-[#666] dark:text-white'">
		<NuxtLink to="/" prefetch class="hover:underline underline-offset-1 cursor-pointer">{{ $t("Home") }}</NuxtLink>
		<a href="https://medium.com/@hinomegnome" target="_blank" class="hidden lg:block hover:underline underline-offset-1 cursor-pointer">{{ $t("Blogs") }}</a>
		<a href="https://jobs.gravitalia.com/" target="_blank" class="hidden lg:block hover:underline underline-offset-1 cursor-pointer">{{ $t("Jobs") }}</a>
		<a href="https://support.gravitalia.com/" target="_blank" class="hover:underline underline-offset-1 cursor-pointer">{{ $t("Support") }}</a>
		<a href="https://account.gravitalia.com/terms" target="_blank" class="hover:underline underline-offset-1 cursor-pointer">{{ $t("Terms") }}</a>
		<a href="https://account.gravitalia.com/privacy" target="_blank" class="hover:underline underline-offset-1 cursor-pointer">{{ $t("Privacy") }}</a>
	</div>
</template>

<script>
    export default {
        props: {
            absolute: {
                type: Boolean,
                required: false
            }
        }
    }
</script>