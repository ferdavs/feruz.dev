<script>
	let notebooks = __NOTEBOOKS__;
</script>

<h1>Projects</h1>
<p>Here are some of the projects I've worked on:</p>
<ul>
	<li>Energy Consumption of Matrix Multiplication in CPU</li>
	<li>Google Maps-like Navigation with Voice</li>
	<li>Prediction of Energy Usage of Household Electronic Devices with Hardware Energy Meters</li>
</ul>
TODO: add more details
<!-- list NOTEBOOKS -->
<ul>
	{#each notebooks as notebook}
		<li>
			<a
				href={`/projects/p/${notebook}`}
				on:click={(e) => {
					e.preventDefault();
					import(`./p/${notebook}.svelte`).then((module) => {
						console.log(module.default);
						const Component = module.default;
						new Component({
							target: document.body
						});
					});
				}}>{notebook}</a
			>
		</li>
	{/each}
</ul>
