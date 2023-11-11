import { Paginator } from "primereact/paginator";

interface PaginateProps {
    libratPerPage: number;
    totalLibrat: number;
    paginate: number;
  }
  
  const Paginate: React.FC<PaginateProps> = ({ libratPerPage, totalLibrat, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i<=Math.ceil(totalLibrat/libratPerPage); i++){
        pageNumbers.push(i);
    }
  
    return (
      <div>
        {/* Your pagination UI goes here */}
       
        <p>{`Librat per page: ${libratPerPage}, Total Librat: ${totalLibrat}`}</p>
      </div>
    );
  };
  
  export default Paginate;