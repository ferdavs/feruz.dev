<script>
	let VERSION = __APP_VERSION__;
</script>

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/cv">CV</a></li>
		<li><a href="/projects">Projects</a></li>
	</ul>
</nav>

<br />
<br />
<br />
<slot />

<footer>
	Version {VERSION}
</footer>

<style>
	:global(body) {
		padding-left: 10em;
		margin-top: -3em;
		font-family: 'Roboto Serif', sans-serif;
	}
	nav {
		position: fixed;
		top: 0;
		left: 0;
		padding: 1em;
	}

	nav ul {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	nav a {
		text-decoration: none;
		color: #333;
	}

	footer {
		position: fixed;
		bottom: 0;
		right: 0;
		padding: 1em;
		background-color: #f0f0f076;
	}
</style>
