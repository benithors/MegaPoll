// cypress/integration/app.spec.ts

import {isEmpty} from "../../lib/stringUtils";
import {areThereValidOption, cleanPollQuestionCreation, copyPoll} from "../../lib/pollUtil";

describe('Test StringUtil', () => {
    it('should return true on empty string', function () {
        expect(isEmpty("")).eq(true);
    });

    it('should return true on empty string', function () {

        expect(isEmpty(" ")).eq(true);
    });

    it('should return true on space only string', function () {

        expect(isEmpty('   ')).eq(true);
    });
    it('should return false on filled string', function () {

        expect(isEmpty('filled')).eq(false);
    });

    it('should return true on a deep copied empty string', function () {
        let copy = [];
        const original = [{
            pollQuestion: '',
            pollOptions: ['Option', 'option2', ' ']
        }];
        copyPoll(original,copy);
        expect(isEmpty(copy[0].pollQuestion)).eq(true);
    });
})

describe('Test PollUtil', () => {

    const iPollQuestionCreations = cleanPollQuestionCreation([
        {
            pollQuestion: 'This is a poll Question whops',
            pollOptions: ['Option', '', ' ']
        },
        {
            pollQuestion: 'This is a poll Question yeah',
            pollOptions: ['Option blub', '    ', 'Option asd']
        },
        {
            pollQuestion: 'question',
            pollOptions: ['', '    ', 'Option test']
        },
        {
            pollQuestion: 'Question with only one option',
            pollOptions: ['Option test']
        },

        {
            pollQuestion: '',
            pollOptions: ['Option asd3', '    ', 'Option 12312@']
        },
        {
            pollQuestion: '   ',
            pollOptions: ['Option ffsdg', '    ', 'Option gdf']
        },
    ]);

    it('should remove questions that have no question string', () => {
        expect(iPollQuestionCreations).length(4);
    })

    it('should remove questions that have an empty string or whitespace only', function () {
        expect(iPollQuestionCreations).length(4);
    });

    it('should remove options that have an empty string', function () {
        expect(iPollQuestionCreations[1].pollOptions)   .length(2);
    });

    it('should return true if the question has at least two not empty options', function () {
        cy.log(JSON.stringify(iPollQuestionCreations[1]))
        expect(areThereValidOption(iPollQuestionCreations[1])).eq(true);
    });

    it('Should return false for options that has only one option', function () {
      expect(areThereValidOption(
          {
              pollQuestion: 'This is a poll Question whops',
              pollOptions: ['Option', '', ' ']
          },
      )).eq(false)
    });

    it('Should return true for options that has only two valid option', function () {
        expect(areThereValidOption(
            {
                pollQuestion: 'This is a poll Question whops',
                pollOptions: ['Option', 'option2', ' ']
            },
        )).eq(true)
    });


    it('should return a deep copy of a iPollQuestionCreations', function () {
        let copy = [];
        const original = [{
            pollQuestion: 'This is a poll Question whops',
            pollOptions: ['Option', 'option2', ' ']
        }];
        copyPoll(original,copy);
        copy[0].pollQuestion = 'changed question';
        copy[0].pollOptions[0] = 'changed option';
        cy.log(copy[0].pollQuestion,original[0].pollQuestion)
        cy.log(copy[0].pollOptions[0],original[0].pollOptions[0])
        expect(copy[0].pollQuestion).not.eq(original[0].pollQuestion);
        expect(copy[0].pollOptions[0]).not.eq(original[0].pollOptions[0]);
    });



})
