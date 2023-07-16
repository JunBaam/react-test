import Pagination from "./App";
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
    const { prevButton } = renderPageNumbers(1);

    fireEvent.click(prevButton);

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
});
