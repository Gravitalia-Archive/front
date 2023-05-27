<template>
    <div id="success_modal" class="hidden fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center" style="background: rgba(0,0,0,.7);">
		<div class="border-none shadow-lg bg-white dark:bg-zinc-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
			<div class="py-4 text-left px-6">
                <div class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-green-500">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                    <p class="pt-4 text-xl font-bold">{{ $t("Success!") }}</p>
				</div>
				<div class="pt-6 flex justify-center items-center">
                    <p class="px-4 py-3 text-gray-700">{{ $t(text) }}</p>
				</div>
				<div class="flex justify-end pt-2">
					<button @click="close_modal()" class="focus:outline-none px-4 bg-none duration-300 p-3 rounded-lg text-black hover:bg-gray-200 dark:text-white hover:dark:text-gray-200 hover:dark:bg-gray-800">{{ $t("OK") }}</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
        props: {
            text: {
                type: String,
                required: true
            }
        },

        methods: {
            close_modal() {
                document.getElementById("success_modal").classList.add("hidden");
            }
        }
    }
</script>