export const subjectiveToJson = async (excelData) =>
  new Promise((resolve) => {
    if (excelData?.length > 1) {
      const header = excelData[0];
      if (header?.length > 0) {
        let questions = excelData.slice(1);
        questions = questions.map((item) => {
          const questionObj = {};
          header.forEach((headItem, headIndex) => {
            questionObj[headItem] = item[headIndex];
          });
          return questionObj;
        });
        resolve(questions);
      } else resolve(null);
    } else {
      resolve(null);
    }
  });

export const mcqToJson = async (excelData) =>
  new Promise((resolve) => {
    if (excelData?.length > 1) {
      const header = excelData[0];
      if (header?.length > 0) {
        let questions = excelData.slice(1);
        questions = questions.map((item) => {
          const questionObj = {};
          header.forEach((headItem, headIndex) => {
            questionObj[headItem] = item[headIndex];
          });
          return questionObj;
        });
        questions = questions.map(({ a, b, c, d, e, ...rest }) => ({
          ...rest,
          multiple_choices: [a, b, c, d, e]
            ?.filter((item) => !!item)
            ?.map((item) => ({
              value: item,
            })),
          no_of_options: [a, b, c, d, e]?.filter((item) => !!item)?.length,
        }));
        resolve(questions);
      } else resolve(null);
    } else {
      resolve(null);
    }
  });

export const matchTheFollowingToJson = async (excelData) =>
  new Promise((resolve) => {
    if (excelData?.length > 1) {
      const header = excelData[0];
      if (header?.length > 0) {
        let questions = excelData.slice(1);
        questions = questions.map((item) => {
          const questionObj = {};
          header.forEach((headItem, headIndex) => {
            questionObj[headItem] = item[headIndex];
          });
          return questionObj;
        });
        questions = questions.map(({ left, right, ...rest }) => ({
          ...rest,
          match_the_following:
            left && right
              ? left.split(',').map((item, index) => ({
                  left: item,
                  right: right?.split(',')[index] || '',
                }))
              : [],
        }));
        resolve(questions);
      } else resolve(null);
    } else {
      resolve(null);
    }
  });
