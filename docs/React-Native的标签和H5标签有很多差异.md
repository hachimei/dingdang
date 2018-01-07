**React-Native的标签和H5标签有很多差异**

1. Raw text cannot be used outside of a <Text> tag. *文本一定要包裹在标签内，常见的有Text标签*
2. RN不能识别div标签，用View标签代替。
3. fontSize，lineHeight要求值是纯数字，如14，不要14px || '14px'
4. 要求