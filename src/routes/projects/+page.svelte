<script>
	let notebooks = __NOTEBOOKS__;
	// import notesbooks dynamically and store them in a variable
	components = notebooks.map((notebook, index) => {
		import(`./p/${notebook}.svelte`).then((module) => {
			console.log(module.default);
			const Component = module.default;
			new Component({
				// target: document.body
			});
		});
	});
</script>

<h1>Projects</h1>
<p>Here are some of the projects I've worked on:</p>
<ul>
	<li>Energy Consumption of Matrix Multiplication in CPU</li>
	<li>Google Maps-like Navigation with Voice</li>
	<li>Prediction of Energy Usage of Household Electronic Devices with Hardware Energy Meters</li>
</ul>
TODO: add more details
<ul>
	{#each notebooks as notebook}
		<li><a href="/projects/p/{notebook}">{notebook}</a></li>
	{/each}
</ul>
<!-- clicking  -->
