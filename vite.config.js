import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import fs from 'fs';
import { execSync, spawnSync } from 'child_process';

const source = './rendercv_output';
const destination = './static';

function listFiles(folder, ending) {
	return fs.readdirSync(folder)
		.filter(file => file.endsWith(ending)).sort();
}

function listCVFiles(folder, prefix = 'cv') {
	return listFiles(folder, '.png')
		.filter(file => file.startsWith(prefix)).sort();
}

function renderCV() {
	console.log('Rendering CV');

	listCVFiles(source, "Feruz")
		.forEach(file => fs.unlinkSync(`${source}/${file}`));
	
	listCVFiles(destination)
		.forEach(file => fs.unlinkSync(`${destination}/${file}`));

	execSync('rendercv render *CV.yaml');
	// copy only png files
	listCVFiles(source, "Feruz")
			.forEach(file => {
				console.log(file);
				// copy files with names cv1.png, cv2.png, etc.
				let match = file.match(/(\d+)/);
				let number = match ? match[1] : 1;
				fs.copyFileSync(`${source}/${file}`,
					`${destination}/cv${number}.png`);
			});
	
	let readme = listFiles(source, '.md').find(file => file.endsWith('CV.md'));
	if (readme) 
		fs.copyFileSync(`${source}/${readme}`, 'README.md');
	
	return {
		files: listCVFiles(destination),
	};
}

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		__PDFS__: JSON.stringify(listFiles(destination, '.pdf')),
		__CV_FILES__: renderCV(),
		__APP_VERSION__: JSON.stringify(require('./package.json').version),
	}
});
