<template>
    <div id="choice_signal" class="hidden fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center" style="background: rgba(0,0,0,.7);">
		<div class="border-none shadow-lg bg-white dark:bg-zinc-900 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
			<div class="py-4 text-left px-6">
                <div class="flex justify-between items-center">
					<p class="text-2xl font-bold">{{ $t("Why are you reporting?") }}</p>
					<div class="cursor-pointer z-50" @click="close_modal()">
						<svg class="fill-current text-black dark:text-white" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
							<path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
						</svg>
					</div>
				</div>
                <br />
				<div>
                    <p @click="signal(1)" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 cursor-pointer"><span class="text-gray-500 text-sm">{{ $t("Violence, abuse or criminal content") }}</span> <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></span></p>
					<hr />
                    <p @click="signal(2)" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 cursor-pointer"><span class="text-gray-500 text-sm">{{ $t("Hate and harassement") }}</span> <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></span></p>
                    <hr />
                    <p @click="signal(3)" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 cursor-pointer"><span class="text-gray-500 text-sm">{{ $t("Suicide or self-harm") }}</span> <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></span></p>
                    <hr />
                    <p @click="signal(4)" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 cursor-pointer"><span class="text-gray-500 text-sm">{{ $t("Nudity content") }}</span> <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></span></p>
                    <hr />
                    <p @click="signal(5)" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 cursor-pointer"><span class="text-gray-500 text-sm">{{ $t("Misinformation") }}</span> <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></span></p>
                    <hr />
                    <p @click="signal(6)" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 cursor-pointer"><span class="text-gray-500 text-sm">{{ $t("Dangerous content or challenge") }}</span> <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></span></p>
                    <hr />
                    <p @click="signal(7)" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 cursor-pointer"><span class="text-gray-500 text-sm">{{ $t("Personal data leak") }}</span> <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></span></p>
                    <hr />
                    <p @click="signal(8)" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 cursor-pointer"><span class="text-gray-500 text-sm">{{ $t("Copyright/intellectual property violation") }}</span> <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></span></p>
                    <hr />
                    <p @click="signal(0)" class="px-4 py-3 flex items-center justify-between hover:bg-gray-100 cursor-pointer"><span class="text-gray-500 text-sm">{{ $t("Other") }}</span> <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg></span></p>
				</div>
				<div class="flex justify-end pt-2">
					<button @click="close_modal()" class="focus:outline-none px-4 bg-none duration-300 p-3 rounded-lg text-black hover:bg-gray-200 dark:text-white hover:dark:text-gray-200 hover:dark:bg-gray-800">{{ $t("Cancel") }}</button>
				</div>
			</div>
		</div>
	</div>

    <Success text="Your feedback helps us to improve Gravitalia." />
</template>

<script>
    export default {
        methods: {
            close_modal() {
                document.getElementById("choice_signal").classList.add("hidden");
            },

            signal(reason) {
                const token = useCookie("token")?.value;

                if(token && reason) {
                    fetch("https://mod.gravitalia.com/report", {
                        method: "POST",
                        headers: {
                            "Authorization": token,
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            vanity: useRoute().params.id,
                            platform: "gravitalia",
                            reason: reason
                        })
                    })
                    .then(res => res.json())
                    .then(res => {
                        this.close_modal();

                        if(!res.error) {
                            document.getElementById("success_modal").classList.remove("hidden");
                        }
                    });
                }
            }
        }
    }
</script>