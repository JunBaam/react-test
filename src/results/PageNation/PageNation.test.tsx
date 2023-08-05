import Pagination from ".";
import {
  fireEvent,
  getAllByTestId,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

const PAGE_NUMBER_TEST_ID = "page-number";

const renderPageNumbers = (itemsPerPage?: number) => {
  render(
    <Pagination
      totalItems={6}
      itemsPerPage={itemsPerPage ?? 3}
      pageNumberTestId={PAGE_NUMBER_TEST_ID}
    />
  );

  const prevButton = screen.getByText(/previous/i);
  const nextButton = screen.getByText(/next/i);

  return {
    prevButton,
    nextButton,
  };
};

function addTwoNumbers(a: number, b: number) {
  return a + b;
}

describe("addTwoNumbers", () => {
  test("1 and 2 make 3", () => {
    // Arrange
    // 테스트에 필요한 것들을 셋팅
    const argA = 1;
    const argB = 2;
    const assert = 3;

    // Act
    //Arrange를 바탕으로 함수를 셋팅
    const result = addTwoNumbers(argA, argB);

    //Assert
    //결과값이 내가 예상한 값이 맞는지 확인
    expect(result).toBe(assert);
  });
});

describe("Pagination", () => {
  test("Pagination 컴포넌트 렌더링", () => {
    const { prevButton, nextButton } = renderPageNumbers();

    // NOTE: assert (내가 예상하는 결과값이 잘 나왔는지 확인하는 코드 )

    // 해당하는 class가 없다면 error 발생);
    expect(prevButton).toHaveClass("disabled");
    expect(nextButton).not.toHaveClass("disabled");

    // NOTE: testId에 해당하는 엘리먼트 접근
    const pageNumbers = screen.getAllByTestId(PAGE_NUMBER_TEST_ID);

    pageNumbers.forEach((pageNumber, index) => {
      expect(pageNumber).toHaveTextContent(`${index + 1}`);
    });
  });

  test("첫번째 페이지에서는 이전 페이지로 돌아갈 수 없음", () => {
    // Arrange
    const { prevButton } = renderPageNumbers(1);
    // Act
    fireEvent.click(prevButton);
    //Assert
    expect(prevButton).toHaveClass("disabled");
  });

  test("중간 페이지에서는 이전, 다음 페이지로 이동할 수 있음", () => {
    const { prevButton, nextButton } = renderPageNumbers(2);

    fireEvent.click(nextButton);

    expect(prevButton).not.toHaveClass("disabled");
    expect(nextButton).not.toHaveClass("disabled");
  });

  test("마지막 페이지에서는 다음 버튼을 클릭했을 때 다음 페이지로 이동할 수 없음", () => {
    const { nextButton } = renderPageNumbers();

    fireEvent.click(nextButton);

    expect(nextButton).toHaveClass("disabled");
  });

  test("페이지네이션 숫자 클릭시 해당 숫자 페이지로 이동 할 수 있음", () => {
    renderPageNumbers(2);
    const pageNumbers = screen.getAllByTestId(PAGE_NUMBER_TEST_ID);

    fireEvent.click(pageNumbers[2]);

    expect(pageNumbers[2]).toHaveClass("active");
  });
});
