/* eslint-disable react/prop-types */
import React, { Fragment, forwardRef } from 'react';
import { Avatar, Stack } from '@mui/material';
import { CLASSES, ROMAN_OPTIONS, SERIES } from '../../../../../constants/attributes';
import { getValueFromKey } from '../../../../../utils/mapper';
import { shuffleKey } from '../../../../../utils/shuffleKey';

export const StyleThree = forwardRef(({ isStyle, printPdfRef, data }) => {
  const renderMCQSection = (item) => (
    <>
      <div style={{ display: 'flex' }}>
        <h2>{ROMAN_OPTIONS[item?.order]}. Check The Right Answer</h2>
        <h2 style={{ marginLeft: 'auto' }}>
          {+item?.marks_per_question}*{+item?.no_of_questions}={+item?.marks_per_question * +item?.no_of_questions}
        </h2>
      </div>
      <ol type="1" style={{ marginTop: '-15px' }}>
        {item?.questions?.map((question) => (
          <Fragment key={question.id}>
            <li>{question?.question}</li>
            <ol type="a" style={{ display: 'flex', padding: '5px' }}>
              {question?.multiple_choices.map((option, index) => (
                <li style={{ marginRight: '40px' }} key={index}>
                  {option?.value}
                </li>
              ))}
            </ol>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </Fragment>
        ))}
      </ol>
    </>
  );

  const renderTrueFalseSection = (item) => (
    <>
      <div style={{ display: 'flex', marginTop: '-15px' }}>
        <h2>{ROMAN_OPTIONS[item?.order]}. State True (T) or False (F)</h2>
        <h2 style={{ marginLeft: 'auto' }}>
          {+item?.marks_per_question}*{+item?.no_of_questions}={+item?.marks_per_question * +item?.no_of_questions}
        </h2>
      </div>
      {item?.questions?.map((question, index) => (
        <ol style={{ display: 'flex', listStyleType: 'none', marginTop: '0' }} key={index}>
          <li>
            {index + 1}. {question?.question}
          </li>
          <input type="text" style={{ marginLeft: 'auto' }} />
          {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
        </ol>
      ))}
    </>
  );

  const renderFillInTheBlanksSection = (item) => (
    <>
      <div style={{ display: 'flex', marginTop: '-15px' }}>
        <h2>{ROMAN_OPTIONS[item?.order]}. Fill in the blanks:</h2>
        <h2 style={{ marginLeft: 'auto' }}>
          {+item?.marks_per_question}*{+item?.no_of_questions}={+item?.marks_per_question * +item?.no_of_questions}
        </h2>
      </div>
      <ol style={{ marginTop: '-13px' }}>
        {item?.questions?.map((question, index) => (
          <>
            <li key={index}>{question?.question}</li>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </ol>
    </>
  );

  const renderShortQuestionSection = (item) => (
    <>
      <div style={{ display: 'flex', marginTop: '-15px' }}>
        <h2>{ROMAN_OPTIONS[item?.order]}. Answer the following:</h2>
        <h2 style={{ marginLeft: 'auto' }}>
          {+item?.marks_per_question}*{+item?.no_of_questions}={+item?.marks_per_question * +item?.no_of_questions}
        </h2>
      </div>
      <ol style={{ marginTop: '-13px' }}>
        {item?.questions?.map((question) => (
          <>
            <li>{question?.question}</li>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </ol>
    </>
  );

  const renderLongQuestionSection = (item) => (
    <>
      <div style={{ display: 'flex', marginTop: '-15px' }}>
        <h2>{ROMAN_OPTIONS[item?.order]}. Long Questions:</h2>
        <h2 style={{ marginLeft: 'auto' }}>
          {+item?.marks_per_question}*{+item?.no_of_questions}={+item?.marks_per_question * +item?.no_of_questions}
        </h2>
      </div>
      <ol style={{ marginTop: '-13px' }}>
        {item?.questions?.map((question) => (
          <>
            <li>{question?.question}</li>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </ol>
    </>
  );

  const renderOneWordQuestionSection = (item) => (
    <>
      <div style={{ display: 'flex', marginTop: '-15px' }}>
        <h2>{ROMAN_OPTIONS[item?.order]}. One Word Answer Questions</h2>
        <h2 style={{ marginLeft: 'auto' }}>
          {+item?.marks_per_question}*{+item?.no_of_questions}={+item?.marks_per_question * +item?.no_of_questions}
        </h2>
      </div>
      <ol style={{ marginTop: '-13px' }}>
        {item?.questions?.map((question) => (
          <>
            <li>{question?.question}</li>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </ol>
    </>
  );

  const renderAbbreviationQuestionSection = (item) => (
    <>
      <div style={{ display: 'flex', marginTop: '-15px' }}>
        <h2>{ROMAN_OPTIONS[item?.order]}. Abbreviation Answer Questions</h2>
        <h2 style={{ marginLeft: 'auto' }}>
          {+item?.marks_per_question}*{+item?.no_of_questions}={+item?.marks_per_question * +item?.no_of_questions}
        </h2>
      </div>
      <ol style={{ marginTop: '-13px' }}>
        {item?.questions?.map((question) => (
          <>
            <li>{question?.question}</li>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </ol>
    </>
  );

  const renderApplicationBasedQuestionSection = (item) => (
    <>
      <div style={{ display: 'flex', marginTop: '-15px' }}>
        <h2>{ROMAN_OPTIONS[item?.order]}. Application Based Answer Questions</h2>
        <h2 style={{ marginLeft: 'auto' }}>
          {+item?.marks_per_question}*{+item?.no_of_questions}={+item?.marks_per_question * +item?.no_of_questions}
        </h2>
      </div>
      <ol style={{ marginTop: '-13px' }}>
        {item?.questions?.map((question) => (
          <>
            <li>{question?.question}</li>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </ol>
    </>
  );

  const renderMatchTheFollowingSection = (item) => (
    <div className="exam__fields">
      <div className="exam__fieldsTitle">
        <p>{item?.order + 1}. Match the Following </p>
        <p>Marks - {+item?.marks_per_question * +item?.no_of_questions} </p>
      </div>
      <div className="match">
        {item?.questions?.map((it, index) => (
          <div key={index}>
            <div className="match_heading">
              <p>Coloumn A</p>
              <p>Coloumn B</p>
              {data?.isTeacherCopy && <p>Answer</p>}
            </div>
            <div className="match_optionContainer">
              {shuffleKey(it?.match_the_following)?.map((match, index) => (
                <>
                  <div key={index} className="match_option">
                    <p>
                      {index + 1} {match?.left}
                    </p>
                    <p>{match?.right}</p>
                    {data?.isTeacherCopy ? <p>{match?.answer || ''}</p> : ''}
                  </div>
                </>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return !isStyle ? (
    <div className="style3" ref={printPdfRef}>
      <div className="box">
        {data?.isDisplayLogo && data?.schoolLogo ? (
          <Stack justifyContent={'center'} alignItems="center" mb={2}>
            <Avatar src={data?.schoolLogo} sx={{ width: '8vw', height: '8vw' }} />
          </Stack>
        ) : null}
        <h3 className="topcenter">{data?.schoolName}</h3>
        <h3 className="topcenter">{data?.paper_name}</h3>
        <div className="left">
          <h3>Class - {data?.class ? getValueFromKey(data?.class, CLASSES) : ''}</h3>
          <h3>{data?.series ? getValueFromKey(data?.series, SERIES) : ''}</h3>
        </div>
        <div className="right">
          <h3>Mark : {data?.maximum_marks}</h3>
          <h3>
            Time: {data?.hours} H {data?.minutes} M
          </h3>
        </div>
      </div>
      <div style={{ marginLeft: '18%', width: '75%' }}>
        {data?.items?.map((item) => {
          switch (item?.category) {
            case 'multiple_choice':
              return renderMCQSection(item);
            case 'true_or_false':
              return renderTrueFalseSection(item);
            case 'fill_in_the_blanks':
              return renderFillInTheBlanksSection(item);
            case 'long_answer':
              return renderLongQuestionSection(item);
            case 'short_answer':
              return renderShortQuestionSection(item);
            case 'one_word':
              return renderOneWordQuestionSection(item);
            case 'application_based':
              return renderApplicationBasedQuestionSection(item);
            case 'abbreviation':
              return renderAbbreviationQuestionSection(item);
            case 'match_the_following':
              return renderMatchTheFollowingSection(item);
            default:
              return '';
          }
        })}
      </div>
    </div>
  ) : (
    <div className="style3">
      <div className="box">
        <Stack justifyContent={'center'} alignItems="center" mb={2}>
          <Avatar src={'https://source.unsplash.com/user/wsanter'} sx={{ width: '8vw', height: '8vw' }} />
        </Stack>
        <h3 className="topcenter">TPC</h3>
        <div className="left">
          <h3>Class-6</h3>
          <h3>Computer</h3>
        </div>
        <div className="right">
          <h3>Mark:13</h3>
          <h3>Time:20min</h3>
        </div>
      </div>

      <div style={{ marginLeft: '18%', width: '75%' }}>
        <div style={{ display: 'flex' }}>
          <h2>I. Check The Right Answer</h2>
          <h2 style={{ marginLeft: 'auto' }}>1*5=5</h2>
        </div>
        <ol type="1" style={{ marginTop: '-15px' }}>
          <li> Name the unit of CPU, which performs all arithmetic and logical operations.</li>
          <ol type="a" style={{ display: 'flex', padding: '5px' }}>
            <li style={{ marginRight: '40px' }}>MU</li>
            <li style={{ marginRight: '40px' }}>ALU</li>
            <li style={{ marginRight: '40px' }}>CUd</li>
            <li style={{ marginRight: '40px' }}>All of these</li>
          </ol>
          <li>Which one is not a pointing device?</li>
          <ol type="a" style={{ display: 'flex', padding: '5px' }}>
            <li style={{ marginRight: '40px' }}>Mouse</li>
            <li style={{ marginRight: '40px' }}>Track Ball</li>
            <li style={{ marginRight: '40px' }}>Drawing book</li>
            <li style={{ marginRight: '40px' }}>Light Pen</li>
          </ol>
          <li>Name the input device which is used to record voice, music, and sound into the computer.</li>
          <ol type="a" style={{ display: 'flex', padding: '5px' }}>
            <li style={{ marginRight: '40px' }}>Speaker</li>
            <li style={{ marginRight: '40px' }}>Digital Camera</li>
            <li style={{ marginRight: '40px' }}>Microphone</li>
            <li style={{ marginRight: '40px' }}>Light Pen</li>
          </ol>
          <li>
            Name the sensitive pad on a laptop using which you can control the movement of the pointer on the screen.
          </li>
          <ol type="a" style={{ display: 'flex', padding: '5px' }}>
            <li style={{ marginRight: '40px' }}>Touch screen</li>
            <li style={{ marginRight: '40px' }}>Mouse pad</li>
            <li style={{ marginRight: '40px' }}>Touch pad</li>
            <li style={{ marginRight: '40px' }}>Microphone</li>
          </ol>
          <li>Which output device allows you to hear sound?</li>
          <ol type="a" style={{ display: 'flex', padding: '5px' }}>
            <li style={{ marginRight: '40px' }}>Speaker</li>
            <li style={{ marginRight: '40px' }}>printer</li>
            <li style={{ marginRight: '40px' }}>Monitor</li>
            <li style={{ marginRight: '40px' }}>All of these</li>
          </ol>
        </ol>
        <div style={{ display: 'flex', marginTop: '-15px' }}>
          <h2>II. Fill in the blanks:</h2>
          <h2 style={{ marginLeft: 'auto' }}>1*5=5</h2>
        </div>
        <ol style={{ marginTop: '-13px' }}>
          <li>
            A computer is an ............ that takes data and instructions as input and processes them accordingly to
            give meaningful output.
          </li>
          <li>.......................... keys include Arrow keys, Home, End, Page Up, Page Down, etc.</li>
          <li>The devices through which we enter data and instructions are called ............ devices. </li>
          <li>The ............... keys include Alphabet and Numeric keys.</li>
          <li>The ............... keys are used with other keys to perform certain actions.</li>
        </ol>
        <div style={{ display: 'flex', marginTop: '-15px' }}>
          <h2>III. State True (T) or False (F)</h2>
          <h2 style={{ marginLeft: 'auto' }}>1*5=5</h2>
        </div>

        <ol style={{ display: 'flex', listStyleType: 'none', marginTop: '0' }}>
          <li>1.Navigation keys consist of number keys that start from 0 to 9.</li>
        </ol>
        <ol style={{ display: 'flex', listStyleType: 'none', marginTop: '0' }}>
          <li>2. The CPU has mainly four main pans.</li>
        </ol>
        <ol style={{ display: 'flex', listStyleType: 'none' }}>
          <li>3. Ml-J stands for Memory Unit.</li>
        </ol>
        <ol style={{ display: 'flex', listStyleType: 'none' }}>
          <li>4. Vinod Dham is the inventor of QWERTY keyboard layout.</li>
        </ol>
        <ol style={{ display: 'flex', listStyleType: 'none' }}>
          <li>5. The devices through which we enter data and instructions are called Output devices.</li>
        </ol>
        <div style={{ display: 'flex', marginTop: '-15px' }}>
          <h2>IV. Answer the following:</h2>
          <h2 style={{ marginLeft: 'auto' }}>2.5*2=5</h2>
        </div>
        <ol style={{ marginTop: '-13px' }}>
          <li>What are input devices? Name any two</li>
          <li>What is a printer? Name the types of printer</li>
        </ol>
      </div>
    </div>
  );
});
