import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import { exec } from 'child_process';

function renderCV() {
	console.log('Rendering CV');
	exec('rendercv render *CV.yaml', (err, stdout, stderr) => {
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
		files.forEach(file => {
			fs.unlinkSync(`${source}/${file}`);
		});

	});
	return { path: '/cv.pdf' };
}

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__CV_PATH__: renderCV(),
		__APP_VERSION__: JSON.stringify(require('./package.json').version),
	}
});
