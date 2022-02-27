#!/usr/bin/env sh

npm run build

cd dist

cp index.html 404.html

cd ..

git add dist -f

git commit -m "add dist"

git subtree push --prefix dist origin gh-pages