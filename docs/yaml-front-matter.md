# YAML Front Matter Rules for Jekyll Posts

## Important Rule: Always Quote Fields with Special Characters

### The Problem
YAML uses colons (`:`) as key-value separators. When a value contains a colon, it can cause parsing errors like:
```
Error in user YAML: (<unknown>): mapping values are not allowed in this context at line 2 column 64
```

### The Solution
**Always wrap `title`, `description`, and `keywords` fields in double quotes (`"`) when they contain:**
- Colons (`:`) - e.g., "Title: Subtitle"
- Special Unicode characters like `【】`
- Commas in keywords lists
- Any other special characters

### Correct Format

```yaml
---
layout: post
title: "【Category】Post Title: With Colon"
categories: CategoryName
description: "Description text here"
keywords: "Keyword1, Keyword2, Keyword3"
date: YYYY-MM-DD
---
```

### Examples of Common Errors

❌ **WRONG** - Colon without quotes:
```yaml
title: Hysteresis: Understanding Delayed Effects
```

✅ **CORRECT** - Colon with quotes:
```yaml
title: "Hysteresis: Understanding Delayed Effects"
```

❌ **WRONG** - Special characters without quotes:
```yaml
title: 【Pharmacodynamic】Exposure-Response Analysis: Linking PK to PD
```

✅ **CORRECT** - Special characters with quotes:
```yaml
title: "【Pharmacodynamic】Exposure-Response Analysis: Linking PK to PD"
```

### Best Practice
**Always quote `title`, `description`, and `keywords` fields** to avoid YAML parsing errors, even if they don't currently contain special characters. This prevents future errors if you add colons or special characters later.

### Checklist When Creating/Editing Posts
- [ ] `title` field is wrapped in double quotes
- [ ] `description` field is wrapped in double quotes  
- [ ] `keywords` field is wrapped in double quotes
- [ ] No extra spaces before/after quotes
- [ ] Date format is YYYY-MM-DD

### Testing
After editing front matter, test with:
```bash
# Jekyll will show YAML errors when building
jekyll build
# or
jekyll serve
```




