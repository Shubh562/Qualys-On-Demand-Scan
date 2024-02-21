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
