<script>
	export let showModal; // boolean

	let dialog; // HTMLDialogElement

	$: if (dialog && showModal) {
		console.log("dialog");
		dialog.showModal();
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="bg-[#1D1F25] backdrop:bg-black/20 backdrop:backdrop-blur rounded-lg shadow-xl border border-[#24272E]"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="p-6 w-full max-w-md mx-auto relative">
		<slot name="header" />
		<slot />
		<!-- svelte-ignore a11y-autofocus -->
		<button autofocus on:click={() => dialog.close()} class="text-gray-500"
			>close modal</button
		>
	</div>
</dialog>
