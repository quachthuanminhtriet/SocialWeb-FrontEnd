import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';


class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      htmlContent: ""
    };
  }

  onEditorStateChange = (editorState) => {
    const htmlContent = stateToHTML(this.state.editorState.getCurrentContent());
    this.setState({
        htmlContent: htmlContent
    })
    this.setState({
      editorState,
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}

export default ControlledEditor;
