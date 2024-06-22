/* eslint-disable react/prop-types */
import React, { forwardRef } from 'react';
import { Stack } from '@mui/material';
import Avatar from '../../../../../components/Avatar';
import { ALPHABETS_OPTIONS, CLASSES, SERIES } from '../../../../../constants/attributes';
import { getValueFromKey } from '../../../../../utils/mapper';
import { shuffleKey } from '../../../../../utils/shuffleKey';

export const StyleOne = forwardRef(({ isStyle, printPdfRef, data }) => {
  const renderMCQSection = (item) => (
    <div className="exam__fields">
      <div className="exam__fieldsTitle">
        <p>{item?.order + 1}. Choose the correct: </p>
        <p>Marks - {+item?.marks_per_question * +item?.no_of_questions} </p>
      </div>
      <div className="exam__fieldsQuestions">
        {item?.questions.map((question, index) => (
          <div key={index}>
            <p>
              {index + 1}. {question?.question}
            </p>
            <div className="options">
              {question?.multiple_choices.map((option, index) => (
                <>
                  <p key={index}>
                    {`(${ALPHABETS_OPTIONS[index]})`} {option?.value}
                  </p>
                </>
              ))}
            </div>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTrueFalseSection = (item) => (
    <div className="exam__fields">
      <div className="exam__fieldsTitle">
        <p>{item?.order + 1}. True or False </p>
        <p>Marks - {+item?.marks_per_question * +item?.no_of_questions} </p>
      </div>
      <div className="exam__fieldsQuestions">
        {item?.questions?.map((question, index) => (
          <>
            <p key={index}>
              {index + 1}. {question?.question}
            </p>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </div>
    </div>
  );

  const renderFillInTheBlanksSection = (item) => (
    <div className="exam__fields">
      <div className="exam__fieldsTitle">
        <p>{item?.order + 1}. Fill in the blanks </p>
        <p>Marks - {+item?.marks_per_question * +item?.no_of_questions} </p>
      </div>
      <div className="fillup">
        {item?.questions?.map((question, index) => (
          <>
            <p key={index}>
              {index + 1}. {question?.question}
            </p>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </div>
    </div>
  );

  const renderShortQuestionSection = (item) => (
    <div className="exam__fields">
      <div className="exam__fieldsTitle">
        <p>{item?.order + 1}. Short Answer Questions </p>
        <p>Marks - {+item?.marks_per_question * +item?.no_of_questions} </p>
      </div>
      <div className="fillup">
        {item?.questions?.map((question, index) => (
          <>
            <p key={index}>
              {index + 1}. {question?.question}
            </p>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </div>
    </div>
  );

  const renderLongQuestionSection = (item) => (
    <div className="exam__fields">
      <div className="exam__fieldsTitle">
        <p>{item?.order + 1}. Long Answer Questions </p>
        <p>Marks - {+item?.marks_per_question * +item?.no_of_questions} </p>
      </div>
      <div className="fillup">
        {item?.questions?.map((question, index) => (
          <>
            <p key={index}>
              {index + 1}. {question?.question}
            </p>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </div>
    </div>
  );

  const renderOneWordQuestionSection = (item) => (
    <div className="exam__fields">
      <div className="exam__fieldsTitle">
        <p>{item?.order + 1}. One Word Answer Questions </p>
        <p>Marks - {+item?.marks_per_question * +item?.no_of_questions} </p>
      </div>
      <div className="fillup">
        {item?.questions?.map((question, index) => (
          <>
            <p key={index}>
              {index + 1}. {question?.question}
            </p>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </div>
    </div>
  );

  const renderAbbreviationQuestionSection = (item) => (
    <div className="exam__fields">
      <div className="exam__fieldsTitle">
        <p>{item?.order + 1}. Abbreviation Answer Questions </p>
        <p>Marks - {+item?.marks_per_question * +item?.no_of_questions} </p>
      </div>
      <div className="fillup">
        {item?.questions?.map((question, index) => (
          <>
            <p key={index}>
              {index + 1}. {question?.question}
            </p>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </div>
    </div>
  );

  const renderApplicationBasedQuestionSection = (item) => (
    <div className="exam__fields">
      <div className="exam__fieldsTitle">
        <p>{item?.order + 1}. Application Based Answer Questions </p>
        <p>Marks - {+item?.marks_per_question * +item?.no_of_questions} </p>
      </div>
      <div className="fillup">
        {item?.questions?.map((question, index) => (
          <>
            <p key={index}>
              {index + 1}. {question?.question}
            </p>
            {data?.isTeacherCopy ? <p>Answer : {question?.answer || ''}</p> : ''}
          </>
        ))}
      </div>
    </div>
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
    <div className="paperTemplate" ref={printPdfRef}>
      <div className="pt__container">
        {data?.isDisplayLogo && data?.schoolLogo ? (
          <Stack justifyContent={'center'} alignItems="center" mb={2}>
            <Avatar src={data?.schoolLogo} sx={{ width: '8vw', height: '8vw' }} />
          </Stack>
        ) : null}
        <h4>{data?.schoolName}</h4>
        <h5>{data?.paper_name}</h5>
        <h2>{data?.series ? getValueFromKey(data?.series, SERIES) : ''}</h2>
        <div className="exam__detail">
          <p>STD - {data?.class ? getValueFromKey(data?.class, CLASSES) : ''}</p>
          <p>
            Time: {data?.hours} H {data?.minutes} M
          </p>
          <p>MM : {data?.maximum_marks}</p>
        </div>

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

        <p>-------------------XXX------------------</p>
      </div>
    </div>
  ) : (
    <div className="paperTemplate">
      <div className="pt__container">
        <Stack justifyContent={'center'} alignItems="center" mb={2}>
          <Avatar src={'https://source.unsplash.com/user/wsanter'} sx={{ width: '8vw', height: '8vw' }} />
        </Stack>
        <h4>School</h4>
        <h5>Name of Examination</h5>
        <h2>Subject</h2>
        <div className="exam__detail">
          <p>STD-VII</p>
          <p>TIME: 2 HOURS</p>
          <p>MM : 50</p>
        </div>
        <div className="exam__fields">
          <div className="exam__fieldsTitle">
            <p>IV. Choose the correct: </p>
            <p>Marks - 15 </p>
          </div>
          <div className="exam__fieldsQuestions">
            <div>
              <p>1. How many types of architecture are there?</p>
              <div className="options">
                <p>a. 1</p>
                <p>b. 2</p>
                <p>c. 3</p>
                <p>d. 4</p>
              </div>
            </div>
            <div>
              <p>2. Which icon is selelcted on the desktop to access a fill from a shared drive?</p>
              <div className="options">
                <p>a. Document</p>
                <p>b. Compute</p>
                <p>c. Network</p>
                <p>d. Desktop</p>
              </div>
            </div>
            <div>
              <p>3. Which data type generates a sequential number whenever a new record is added to a table?</p>
              <div className="options">
                <p>a. Number</p>
                <p>b. Auto Number</p>
                <p>c. Text</p>
                <p>d. OLE</p>
              </div>
            </div>
            <div>
              <p>4. Which data type can attach images, spreadsheet files etc.to the records in your database?</p>
              <div className="options">
                <p>a. Number</p>
                <p>b. Text</p>
                <p>c. OLE</p>
                <p>d. Attachment</p>
              </div>
            </div>
            <div>
              <p>5. Which icon appears to indicate Edit mode?</p>
              <div className="options">
                <p>a. Eraser Icon</p>
                <p>b. Pen Icon</p>
                <p>c. Pencil</p>
                <p>d. All of these</p>
              </div>
            </div>
          </div>
        </div>
        <div className="exam__fields">
          <div className="exam__fieldsTitle">
            <p>V. Match the coloumn </p>
            <p>Marks - 15 </p>
          </div>
          <div className="match">
            <div className="match_heading">
              <p>Coloumn A</p>
              <p>Coloumn B</p>
            </div>
            <div className="match_optionContainer">
              <div className="match_option">
                <p>1. Triple helical structure of collagen</p>
                <p> Triple helical structure of collagen</p>
              </div>
              <div className="match_option">
                <p>2. Triple helical strucure of collagen</p>
                <p>Triple helical structure of collagen</p>
              </div>
            </div>
          </div>
        </div>
        <div className="exam__fields">
          <div className="exam__fieldsTitle">
            <p>I. Fill in the blanks: </p>
            <p>Marks - 15 </p>
          </div>
          <div className="abbreviation">
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>
        <div className="exam__fields">
          <div className="exam__fieldsTitle">
            <p>I. Fill in the blanks: </p>
            <p>Marks - 15 </p>
          </div>
          <div className="fillup">
            <p>1. _____________ / (-10) = 0</p>
            <p>2. (-157) * (-19) + 157 _____________</p>
            <p>3. -9 * 20 = _____________</p>
          </div>
        </div>
        <div className="exam__fields">
          <div className="exam__fieldsTitle">
            <p>II. True or False: </p>
            <p>Marks - 15 </p>
          </div>
          <div className="exam__fieldsQuestions">
            <p>1. Integers are closed under subtraction.</p>
            <p>2. Difference of two negative integers cannot be posiive integers</p>
          </div>
        </div>
        <div className="exam__fields">
          <div className="exam__fieldsTitle">
            <p>III. Evaluate using distributive property: </p>
            <p>Marks - 15 </p>
          </div>
          <div className="exam__fieldsQuestions">
            <p>1. -39 * 99</p>
            <p>2. -85 * 43 + 43 * -15</p>
            <p>3. 53 * -17 + -68 * 3</p>
          </div>
        </div>
        <p>-------------------XXX------------------</p>
      </div>
    </div>
  );
});
