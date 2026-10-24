import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import { globalIgnores } from 'eslint/config';

const config = [...nextVitals, ...nextTypescript];
const eslintConfig = [...config, globalIgnores(['wordpress-source/**'])];

export default eslintConfig;
