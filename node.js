const ComparisonTool: React.FC = () => {
  // State and useEffect remain unchanged...

  // Adjusted rendering logic for testcases and testcasesNotRunned

 const renderTestCases = (testCases?: IFeatureTest[]) => {
    if (!testCases) {
      return null;
    }

    return testCases.map((testCase, index) => (
      <div key={index}>
        <strong>{testCase.featurename}:</strong> {testCase.tests.join(', ')}
      </div>
    ));
  };

  return (
    <div className="comparison-container">
      {/* Other parts of the component remain unchanged... */}

      {selectedModuleData && (
        <div className="results-area">
          <table className="results-table">
            <thead>
              <tr>
                <th>Test Cases</th>
                <th>Test Cases Not Runned</th>
                <th>Dependencies</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{renderTestCases(selectedModuleData.testcases)}</td>
                <td>{renderTestCases(selectedModuleData.testcasesNotRunned)}</td>
                <td>{selectedModuleData.dependency.join(", ")}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};




/* ComparisonTool.scss */

.results-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.results-table th,
.results-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.results-table th {
  background-color: #f2f2f2; /* Grey background for headers */
  color: blue; /* Blue text color for headers */
}

.results-table tbody tr:nth-child(even) {
  background-color: #f9f9f9; /* White background for even rows */
}

.results-table tbody tr:nth-child(odd) {
  background-color: #ffffff; /* Grey background for odd rows */
}

