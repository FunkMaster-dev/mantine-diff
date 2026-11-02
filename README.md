# Mantine Diff Component

## Installation

```sh
npm install @funkmaster/mantine-diff
```
or 

```sh
yarn add @funkmaster/mantine-diff
```

After installation import package styles at the root of your application:

```tsx
import '@funkmaster/mantine-diff/styles.css';
```

## Usage

```tsx
import { Diff } from '@funkmaster/mantine-diff';

function Demo() {
  return (
    <Diff 
        config={{
            file: {
                name: "File",
                // TablerIcon - Optional icon
            },
        }} 
        data={[
            {
                id: "main.ts",
                name: "main.ts",
                status: "added",
                type: "file",
                content: "main.ts added"
            }
        ]}
    >
        <Diff.Tree />
    </Diff>
  );
}
```