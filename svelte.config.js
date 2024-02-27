import adapter from "@sveltejs/adapter-cloudflare";
import fs from 'fs';
import { exec } from 'child_process';

exec('rendercv render *.yaml', (err, stdout, stderr) => {
	if (err) {
		console.error(err);
		return;
	}
	console.log(stdout);
	const source = 'rendercv_output';
	const destination = 'static';
	fs.readdir(source, (err, files) => {
		files.forEach(file => {
			if (file.endsWith('.pdf')) {
				fs.copyFile(`${source}/${file}`, `${destination}/cv.pdf`, (err) => {
					if (err) throw err;
					console.log(`${file} was copied to ${destination}`);
				});
			}
			// fs.copyFile(`${source}/${file}`, `${destination}/${file}`, (err) => {
			// 	if (err) throw err;
			// 	console.log(`${file} was copied to ${destination}`);
			// });
		});
	});
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter()
	},
};

export default config;
