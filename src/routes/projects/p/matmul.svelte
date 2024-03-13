<script>
// Path prefix for the images
	export let img_path_prefix;
    // Array of alt text for the images
    export let img_alt_text = Array.apply(null, Array(0)).map(function () {
        return 'Image';
    });

// Render Plotly plots, called when the Plotly script is loaded
	const renderPlotly = () => {
		/* Plotly Plots */
        
	};
</script>

<svelte:head>
    <script src="https://cdn.plot.ly/plotly-2.20.0.min.js" charset="utf-8" on:load={renderPlotly}></script>
</svelte:head>

<div class="jupyter">
	<div class="input input-code"><pre class="language-python"><code class="language-python"><span class="token keyword">import</span> pandas <span class="token keyword">as</span> pd
<span class="token keyword">import</span> numpy <span class="token keyword">as</span> np
<span class="token keyword">import</span> keras</code></pre></div><div class="input input-code"><pre class="language-python"><code class="language-python">keras<span class="token punctuation">.</span>__version__</code></pre></div> 
</div>

<style>
/* Do Not Remove  */
/* Used to render latex math */
@import url('https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.css');

/* Link on hover */
.heading > * > a {
	visibility: hidden;
	text-decoration: none;
}
.heading:hover > * > a {
	visibility: visible;
}
div .heading > * > a:hover {
	color: rgb(69, 69, 255);
}

pre {
	margin: 0;
}

/* Controls all inputs */
.input {
	max-width: 100%;
}

/* Controls the code blocks */
.input-code {
	margin-bottom: 1.5em;
	font-size: 0.95em;
}

/* Controls the markdown blocks */
.input-md {
	margin-top: 1.5em;
}

/* Controls all output blocks */
.output {
	display: block;
	max-width: 100%;
	overflow: auto;
}

/* Controls stdout (print statements, text output) */
.output-text {
	font-size: 1em;
}

/* Controls Images */
img {
	max-width: 100%;
}

/* Controls plotly figures */
figure {
	max-width: 100%;
	max-height: 100%;
	margin: 0 auto;
	display: block;
}

/* Wrapper around table outputs */
.output-html-table {
	font-size: 0.85em;
}
/* Table formatting */
th {
	text-align: right;
	border: 0px;
	padding: 0.2em 0.5em;
}
td {
	text-align: right;
	border: 0px;
	padding: 0.2em 0.5em;
}
/* Table headings */
thead > tr > th {
	background-color: #ccc;
	border: 0px;
}
thead > tr:nth-child(2) > th {
	background-color: #ddd;
}
/* Highlight Every other row */
tr:nth-child(even) {
	background-color: #ddd;
}
/* Give rows a border */
tr {
	border: 1px solid #ddd;
}
table {
	border-collapse: collapse;
	margin-right: auto;
	margin: 10px 0;
	display: block;
	width: max-content;
	max-width: 100%;
	overflow: auto;
}

</style>