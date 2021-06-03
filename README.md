![Gyolets logo](./logo.svg)
# gyolets
## Abstract
行列の簡約化を行なうライブラリです。  
CLIツールとして使えるほか、ライブラリとして他のプログラムやWebアプリに組み込んで使いこともできます。  

## Usage
### CLI
```bash
npm install -g @toriyama/gyolets
gyolets -m "[[1,2,3], [4,5,6], [7,8,9]]"
```
```console
1	0	-1
0	1	2
0	0	0
```

### JavaScript
```bash
npm install @toriyama/gyolets
```
```javascript
import Gyolets from "@toriyama/gyolets";
const mat = new Gyolets([
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9]
], {row: 3, column: 3});
const reducedMat = mat.reduction();
reducedMat.log();
```
```console
1	0	-1
0	1	2
0	0	0
```

## License
MIT License

## Author
YUUKIToriyama