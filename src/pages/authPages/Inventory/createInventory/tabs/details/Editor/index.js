import React, {Component} from 'react';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
// import {convertToRaw} from 'draft-js';
import Editor, {createEditorStateWithText} from 'draft-js-plugins-editor';
import createToolbarPlugin, {Separator} from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
} from 'draft-js-buttons';
import {Box} from '@mui/system';

const toolbarPlugin = createToolbarPlugin();
const {Toolbar} = toolbarPlugin;
const plugins = [toolbarPlugin];
const text = 'Please type your additional inventory info here..';

export default class CustomToolbarEditor extends Component {
  state = {
    editorState: createEditorStateWithText(text),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    // console.log(
    //   convertToRaw(this.state.editorState.getCurrentContent()).blocks,
    // );
    return (
      <Box
        sx={{
          paddingInline: 12,
          paddingBlockStart: 1,
          width: 780,
          maxWidth: '100%',
          height: 'auto',
          maxHeight: '100%',
          minHeight: '300px',
        }}
      >
        <Box
          onClick={this.focus}
          sx={{
            height: 'auto',
            maxHeight: '100%',
            minHeight: '300px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingInline: 40,
              marginBlockEnd: 5,
            }}
          >
            <Toolbar>
              {
                // may be use React.Fragment instead of div to improve perfomance after React 16
                (externalProps) => (
                  <Box
                    sx={{
                      width: '400px',
                    }}
                  >
                    <BoldButton {...externalProps} />
                    <ItalicButton {...externalProps} />
                    <UnderlineButton {...externalProps} />
                    <CodeButton {...externalProps} />
                    <Separator {...externalProps} />
                    <HeadlineOneButton {...externalProps} />
                    <HeadlineTwoButton {...externalProps} />
                    <HeadlineThreeButton {...externalProps} />
                    <UnorderedListButton {...externalProps} />
                    <OrderedListButton {...externalProps} />
                    <BlockquoteButton {...externalProps} />
                  </Box>
                )
              }
            </Toolbar>
          </Box>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => {
              this.editor = element;
            }}
          />
        </Box>
      </Box>
    );
  }
}
