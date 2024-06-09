import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import { exec, execSync } from 'child_process';
function renderCV() {
	console.log('Rendering CV');
	// skip if nothing has changed
	let files = fs.readdirSync('.').filter(file => file.endsWith("CV.yaml"));
	let lastModified = Math.max(...files.map(file => fs.statSync(file).mtime));
	let cv = 'static/cv.pdf';
	if (fs.existsSync(cv)) {
		let cvModified = fs.statSync(cv).mtime;
		if (cvModified > lastModified) {
			return { path: '/cv.pdf' };
		}
	}
	exec('poetry run rendercv render *CV.yaml', (err, stdout, stderr) => {
		if (err) {
			console.error(stderr);
			return;
		}
		console.log(stdout);
		const source = 'rendercv_output';
		const destination = 'static';
		let files = fs.readdirSync(source);
		let cv = files.find(file => file.endsWith('CV.pdf'));
		if (cv) {
			fs.copyFileSync(`${source}/${cv}`, `${destination}/cv.pdf`);
		}
		let readme = files.find(file => file.endsWith('CV.md'));
		if (readme) {
			fs.copyFileSync(`${source}/${readme}`, `README.md`);
		}

		let tex = files.find(file => file.endsWith('CV.tex'));
		if (tex) {
			// execSync(`pandoc -f latex -t html -o static/cv.html ./${source}/${tex}`);
		}

		// files.forEach(file => {
		// 	fs.unlinkSync(`${source}/${file}`);
		// });
	});
	return { path: '/cv.pdf' };
}

function convertNotebooks() {
	console.log('Converting Jupyter notebooks');
	// skip if nothing has changed
	let files = fs.readdirSync('projects').filter(file => file.endsWith('.ipynb'));
	let lastModified = Math.max(...files.map(file => fs.statSync(`projects/${file}`).mtime));
	let lastConverted = Math.max(...files.map(file => fs.statSync(`src/routes/projects/p/${file.replace('.ipynb', '.svelte')}`).mtime));
	if (lastModified < lastConverted) {
		return files.map(file => file.replace('.ipynb', ''));
	}
	// list of ipynb files
	const notebooks = fs.readdirSync('projects').filter(file => file.endsWith('.ipynb'));
	// convert to svelte
	notebooks.forEach(notebook => {
		execSync(`jupyter2svelte convert --embed-images projects/${notebook}`);
		let component = notebook.replace('.ipynb', '.svelte');
		fs.renameSync(`projects/${component}`, `src/routes/projects/p/${component}`);
	});
	console.log('Converted', notebooks);
	return notebooks.map(notebook => notebook.replace('.ipynb', ''));
}

function listPdf() {
	return fs.readdirSync('static').filter(file => file.endsWith('.pdf') && file !== 'cv.pdf');
}

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__CV_PATH__: renderCV(),
		// __NOTEBOOKS__: convertNotebooks(),
		__PDFS__: listPdf(),
		__APP_VERSION__: JSON.stringify(require('./package.json').version),
	}
});
