<script>
	// let notebooks = __NOTEBOOKS__;
	let pdfs = __PDFS__;
	// import notesbooks dynamically and store them in a variable
	// components = notebooks.map((notebook, index) => {
	// 	import(`./p/${notebook}.svelte`).then((module) => {
	// 		console.log(module.default);
	// 		const Component = module.default;
	// 		new Component({
	// 			// target: document.body
	// 		});
	// 	});
	// });
</script>

<h1>Projects</h1>
<p>Here are some of the projects I've worked on:</p>
<ul>
	<li>Energy Consumption of Matrix Multiplication in CPU</li>
	<li>Google Maps-like Navigation with Voice</li>
	<li>Prediction of Energy Usage of Household Electronic Devices with Hardware Energy Meters</li>
</ul>
TODO: convert below pdfs to html
<ul>
	{#each pdfs as pdf}
		<li><a href={pdf}>{pdf}</a></li>
	{/each}
</ul>
<!-- clicking  -->
