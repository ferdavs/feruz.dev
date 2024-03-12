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
		fs.readdir(source, (err, files) => {
			if (err) {
				console.error(err);
				return;
			}
			const pdfFile = files.find(file => file.endsWith('CV.pdf'));
			if (!pdfFile) {
				console.error('No PDF file found');
				return;
			}
			fs.rename(`${source}/${pdfFile}`, `${destination}/cv.pdf`, (err) => {
				if (err) {
					console.error(err);
					return;
				}
				console.log(`Moved ${pdfFile} to ${destination}`);
			});
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
