type StoryStruct = {
  title: string;
  story: string;
  titleZH: string;
  storyZH: string;
}

async function WordToStory(words: string[]): Promise<StoryStruct> {
  try {
    // 1. combine words into a single string
    const params = new URLSearchParams();
    params.append('words', JSON.stringify(words));

    // 2. send request to the API
    const response = await fetch(`https://func.fs1n.site/word2story?${params.toString()}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    // 3. parse the response and return the story
    const resp: StoryStruct = await response.json();
    console.log(resp);
    return resp;
  
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate story.');
  }
}

export { WordToStory }