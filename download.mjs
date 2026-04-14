import fs from 'fs';
import https from 'https';

const urls = {
  "landing.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzEyMDczN2ZkYWNlMjQzYTdiYmRiNTA0ZDMxOWE3ZDMzEgsSBxCf_-WfrhgYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDE0NzkyNDMwNTk2NjE0NzE0Nw&filename=&opi=89354086",
  "dashboard.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2M3MzY1NDZlNDMxNzRlNWVhMTEwMWE0NjMxODk3NDhiEgsSBxCf_-WfrhgYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDE0NzkyNDMwNTk2NjE0NzE0Nw&filename=&opi=89354086",
  "calculator.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sX2M1YTZiMTFiMTlmODQ2ZTFiOTgzNjIyNjk0MWZkYzk5EgsSBxCf_-WfrhgYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDE0NzkyNDMwNTk2NjE0NzE0Nw&filename=&opi=89354086",
  "planner.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ8Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpbCiVodG1sXzYyOWMzZjM5OTcwZDQwNTZiOGIzZmM1NTc5Zjk0OTMwEgsSBxCf_-WfrhgYAZIBJAoKcHJvamVjdF9pZBIWQhQxMDE0NzkyNDMwNTk2NjE0NzE0Nw&filename=&opi=89354086"
};

for (const [file, url] of Object.entries(urls)) {
  https.get(url, (res) => {
    const path = `C:\\Users\\Tanmay\\OneDrive\\Desktop\\GradeFlow\\gradeflow\\${file}`;
    const writeStream = fs.createWriteStream(path);
    res.pipe(writeStream);
    writeStream.on('finish', () => {
      writeStream.close();
      console.log(`Download Completed: ${file}`);
    });
  });
}
