<script>
	import Body from './Body.svelte';

	let VERSION = __APP_VERSION__;
</script>

<Body />

<footer>
	Version {VERSION}
</footer>

<style>
	/* change position to bottom right */
	footer {
		position: fixed;
		bottom: 0;
		right: 0;
		padding: 1em;
		background-color: #f0f0f076;
	}
</style>
