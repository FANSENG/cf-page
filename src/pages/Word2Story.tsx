import React, {useState} from 'react'
import { Card, Input, Tag, Button, message } from 'antd';
import './Word2Story.css'
import { WordToStory } from '../bridge/word2story';

const colors = [
  'magenta','red','volcano','orange','gold',
  'green','cyan','blue','geekblue','purple'
]

const Word2Story = () => {
    const [inputValue, setInputValue] = useState('');
    const [storyTitle, setStoryTitle] = useState('Story Title');
    const [story, setStory] = useState('Story');
    const [storyTitleZH, setStoryTitleZH] = useState('标题');
    const [storyZH, setStoryZH] = useState('故事');
    const [wordList, setWordList] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);


    const [messageApi, contextHolder] = message.useMessage();

    const deleteClickTag = (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      const value = e.currentTarget.parentNode?.textContent ;
      if(value) {
        setWordList(wordList.filter((word) => word !== value))
      }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== 'Enter') {
        return;
      }
      if((e.metaKey || e.altKey) && inputValue.trim() === '') {
        wordsToStory();
        return;
      }
      if(wordList.length > 10) {
        messageApi.info('You have reached the maximum number of words.', 2);
        return;
      }
      if (inputValue.trim() === '') {
        messageApi.info('Please enter a word.', 2);
        return;
      }
      if(wordList.includes(inputValue)) {
        messageApi.info('This word has already been added.', 2);
        return;
      }
      setWordList([...wordList, inputValue]);
      setInputValue('');
    };

    const boldWords = (text: string, words: string[]) => {
      const pattern = new RegExp(`\\b(${words.join('|')})\\b`, 'gi');
      return text.replace(pattern, '<strong>$1</strong>');
    };

    // Words to story
    const wordsToStory = async () => {
      if(wordList.length === 0) {
        messageApi.info('Please enter at least one word.', 2);
        return;
      }
      setLoading(true);
      try{
        const resp = await WordToStory(wordList)
        const boldStory = boldWords(resp.story, wordList);

        setStoryTitle(resp.title)
        setStory(boldStory)
        setStoryTitleZH(resp.titleZH)
        setStoryZH(resp.storyZH)
        setWordList([]);
      }catch(e) {
        messageApi.error('Something went wrong. Please try again.', 2);
      }finally{
        setLoading(false);
      }
    };

    return (
      <>
      {contextHolder}
      <div className='mainContainer'>
        <Card className='storyCard' title={storyTitle} style={{ width: 600 }}>
        <div dangerouslySetInnerHTML={{ __html: story }} />
        </Card>
        <Card className='storyCardZH' title={storyTitleZH} style={{ width: 600 }}>
          {storyZH}
        </Card>
      </div>
      <div className="buttContainer">
          <div className='wordsContainer'>
          {wordList.map((word, index) => (
            <Tag key={index} color={colors[index]} closable onClose={deleteClickTag}>
              {word}
            </Tag>
          ))}
          </div>
          <div className='inputContainer'>
                <Input 
                className='inputBlock' 
                showCount
                maxLength={24} 
                placeholder="input a word then enter"
                value={inputValue}
                disabled={loading}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                />
              <Button type="primary" onClick={wordsToStory} loading={loading}>
                Generate Story
              </Button>
          </div>
      </div>
      </>
  );
};

export default Word2Story;
