import React from 'react';
import { Icon } from 'semantic-ui-react';

import './pagination.scss';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
};

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLimit: 10,
      totalPages: 1,
      currentPage: 1,
      totalRecords: 0,
      pageNeighbours: 1,
    };
  }

  componentDidMount() {
    // this.gotoPage(1);
  }

  componentDidUpdate(prevProps) {
    if (this.props.pageLimit && this.props.pageLimit !== prevProps.pageLimit) {
      this.setState({
        pageLimit: this.props.pageLimit,
      });
    }
    if (
      this.props.pageNeighbours &&
      this.props.pageNeighbours !== prevProps.pageNeighbours
    ) {
      this.setState({
        pageNeighbours: Math.max(0, Math.min(this.props.pageNeighbours, 2)),
      });
    }
    if (
      this.props.totalRecords &&
      this.props.totalRecords !== prevProps.totalRecords
    ) {
      this.setState({
        totalRecords: this.props.totalRecords,
      });
    }
    if (
      this.props.totalPages &&
      this.props.totalPages !== prevProps.totalPages
    ) {
      this.setState({
        totalPages: this.props.totalPages,
      });
    }
  }

  gotoPage = page => {
    const { onPageChanged = f => f } = this.props;

    const currentPage = Math.max(0, Math.min(page, this.state.totalPages));

    const paginationData = {
      currentPage,
      totalPages: this.state.totalPages,
      pageLimit: this.state.pageLimit,
      totalRecords: this.state.totalRecords,
    };

    this.setState({ currentPage }, () => onPageChanged(paginationData));
  };

  handleClick = (page, evt) => {
    evt.preventDefault();
    this.gotoPage(page);
  };

  handleMoveLeft = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage - this.state.pageNeighbours * 2 - 1);
  };

  handleMoveRight = evt => {
    evt.preventDefault();
    this.gotoPage(this.state.currentPage + this.state.pageNeighbours * 2 + 1);
  };

  fetchPageNumbers = () => {
    const { totalPages } = this.state;
    const { currentPage } = this.state;
    const { pageNeighbours } = this.state;

    const totalNumbers = this.state.pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  };

  render() {
    if (!this.state.totalRecords) return null;

    if (this.state.totalPages === 1) return null;

    const { currentPage } = this.state;
    const pages = this.fetchPageNumbers();

    return (
      <>
        <nav>
          <ul className="pagination">
            {pages.map((page, index) => {
              if (page === LEFT_PAGE)
                return (
                  <li key={index}>
                    <button
                      className="icon__holder"
                      onClick={this.handleMoveLeft}
                    >
                      <a href="#" className="page-link" aria-label="Previous">
                        <Icon name="chevron left" />
                      </a>
                    </button>
                  </li>
                );

              if (page === RIGHT_PAGE)
                return (
                  <li key={index}>
                    <button
                      className="icon__holder"
                      onClick={this.handleMoveRight}
                    >
                      <a href="#" aria-label="Next" className="page-link">
                        <Icon name="chevron right" />
                      </a>
                    </button>
                  </li>
                );

              return (
                <li
                  key={index}
                  className={`page-item${
                    currentPage === page ? ' active' : ''
                  }`}
                  onClick={e => this.handleClick(page, e)}
                >
                  <a className="page-link" href="#">
                    {page}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </>
    );
  }
}

export default Pagination;
