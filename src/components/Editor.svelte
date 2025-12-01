<!-- src/components/Editor.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { EditorState } from '@codemirror/state';
  import { EditorView, keymap, lineNumbers } from '@codemirror/view';
  import { defaultKeymap } from '@codemirror/commands';
  import { css } from '@codemirror/lang-css';
  import { oneDark } from '@codemirror/theme-one-dark';  // Fixed: no HTML comment!

  export let value: string = '';
  export let onChange: (val: string) => void = () => {};
  export let container: HTMLDivElement | undefined = undefined;

  let view: EditorView | null = null;

  onMount(() => {
    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        css(),
        oneDark,
        keymap.of(defaultKeymap),
        EditorView.editable.of(true),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString();
            value = newValue;
            onChange(newValue);
          }
        })
      ]
    });

    view = new EditorView({
      state,
      parent: container!
    });

    if (container) {
      (container as any).highlightLine = (lineNumber: number) => {
        if (!view) return;
        const line = view.state.doc.line(lineNumber);
        if (!line) return;

        view.dispatch({
          selection: { anchor: line.from },
          effects: EditorView.scrollIntoView(line.from, { y: 'center' })
        });
        view.focus();
      };
    }

    return () => {
      view?.destroy();
      view = null;
    };
  });

  // Handle external updates (share URL)
  $: if (view && value !== view.state.doc.toString()) {
    const current = view.state.doc.toString();
    if (value !== current) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value }
      });
    }
  }
</script>

<div
  bind:this={container}
  class="w-100 h-100"
  style="min-height: 500px; border-radius: 0.375rem; overflow: hidden;"
></div>

<style>
  :global(.cm-editor) {
    height: 100%;
    font-size: 14.5px;
  }
  :global(.cm-content) {
    padding: 16px 0 !important;
    font-family: 'Fira Code', 'JetBrains Mono', Menlo, Monaco, Consolas, 'Courier New', monospace !important;
    line-height: 1.6;
  }
  :global(.cm-line) {
    padding: 0 12px !important;
  }
  :global(.cm-scroller) {
    overflow: auto;
  }
  :global(.cm-focused) {
    outline: none !important;
  }
  :global(.cm-activeLine) {
    background-color: rgba(255, 255, 255, 0.07) !important;
  }
</style>