import React from 'react';
import PropTypes from 'prop-types';
import '/Styles/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faTimes } from '@fortawesome/free-solid-svg-icons';


const imgSrcs = [
    'https://github.com/bellamoss77/galerieCrepusculeReact/blob/main/public/images_min/skylineSunset1-01.png?raw=true', 'https://github.com/bellamoss77/galerieCrepusculeReact/blob/main/public/images_min/skylineSunset1-02.png?raw=true', 'https://github.com/bellamoss77/galerieCrepusculeReact/blob/main/public/images_min/skylineSunset1-03.png?raw=true', 'https://github.com/bellamoss77/galerieCrepusculeReact/blob/main/public/images_min/skylineSunset1-04.png?raw=true', 'https://github.com/bellamoss77/galerieCrepusculeReact/blob/main/public/images_min/skylineSunset1-05.png?raw=true', 'https://github.com/bellamoss77/galerieCrepusculeReact/blob/main/public/images_min/skylineSunset1-06.png?raw=true', 'https://github.com/bellamoss77/galerieCrepusculeReact/blob/main/public/images_min/skylineSunset1-07.png?raw=true', 'https://github.com/bellamoss77/galerieCrepusculeReact/blob/main/public/images_min/skylineSunset1-08.png?raw=true', 'https://github.com/bellamoss77/galerieCrepusculeReact/blob/main/public/images_min/skylineSunset1-09.png?raw=true', 'https://github.com/bellamoss77/galerieCrepusculeReact/blob/main/public/images_min/skylineSunset1-10.png?raw=true', 'https://github.com/bellamoss77/galerieCrepusculeReact/blob/main/public/images_min/skylineSunset1-11.png?raw=true', 'https://github.com/bellamoss77/galerieCrepusculeReact/blob/main/public/images_min/skylineSunset1-12.png?raw=true'
];

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentIndex: null };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.findNext = this.findNext.bind(this);
        this.findPrev = this.findPrev.bind(this);
        this.renderImageContent = this.renderImageContent.bind(this);
    }
    renderImageContent(src, index) {
        return (
            <div key={src} onClick={(e) => this.openModal(e, index)}>
                <img src={src} />
            </div>
        )
    }
    openModal(e, index) {
        console.log(`Opening modal for image at index: ${index}`);
        this.setState ({ currentIndex: index });
    }
    closeModal(e) {
        if (e != undefined) {
            e.preventDefault();
        }
        this.setState ({ currentIndex: null });
    }
    findPrev(e) {
        if (e != undefined) {
            e.preventDefault();
        }
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex - 1
        }));
    }
    findNext(e) {
        if (e != undefined) {
            e.preventDefault();
        }
        this.setState(prevState => ({
            currentIndex: prevState.currentIndex + 1
        }));
    }
    render() {
        const currentImgSrc = this.state.currentIndex !== null ? imgSrcs[this.state.currentIndex] : null;
        console.log('Current Img Src: ', currentImgSrc);

        return (
            <div className='gallery-container'>
                <h1>Galarie de Crépuscule</h1>
                <div className='gallery-grid'>
                    {imgSrcs.map((src, index) => this.renderImageContent(src, index))}
                </div>
                {currentImgSrc && <GalleryModal
                    closeModal={this.closeModal}
                    findPrev={this.findPrev}
                    findNext={this.findNext}
                    hasPrev={this.state.currentIndex > 0}
                    hasNext={this.state.currentIndex + 1 < imgSrcs.length}
                    src={currentImgSrc}
                    />} 
            </div>
        )
    }
}



class GalleryModal extends React.Component {
    constructor() {
        super();
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    
    componentDidMount() {
        document.body.addEventListener('keydown', this.handleKeyDown);
    }
    componentWillUnmount() {
        document.body.removeEventListener('keydown', this.handleKeyDown);
    }
    handleKeyDown(e) {
        if (e.keyCode === 27)
          this.props.closeModal();
        if (e.keyCode === 37 && this.props.hasPrev)
          this.props.findPrev();
        if (e.keyCode === 39 && this.props.hasNext)
          this.props.findNext();
    }
    render () {
        const { closeModal, hasNext, hasPrev, findNext, findPrev, src } = this.props;
        console.log('Rendering modal with src: ', src);
        if (!src) {
            console.log('whut')
            return null;
        }
        return (
            <div>
                <div className='modal-overlay' onClick={closeModal} style={{
                    position: 'fixed',
                    zIndex: 1,
                    height: '100%',
                    width: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    top: 0,
                    left: 0,
                }}></div>
                <div className='modal' style={{
                    position: 'fixed',
                    zIndex: 9999,
                    width: '50%',
                    maxWidth: '800px',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                }}>
                    <div className='modal-body' style={{
                        position: 'relative',
                    }}>
                        <a href='#' className='modal-close' onClick={closeModal} onKeyDown={this.handleKeyDown} style={{
                            position: 'absolute',
                            display: 'inline',
                            color: 'black',
                            textDecoration: 'none',
                            lineHeight: '36px',
                            fontSize: '30px',
                            fontWeight: 'lighter',
                            background: '#fff',
                            borderRadius: '0 0 0 5px',
                            height: '40px', width: '40px',
                            textAlign: 'center',
                            right: 0,
                            top: 0,
                        }}><FontAwesomeIcon icon={faTimes} /></a>
                        {hasPrev && <a href='#' className='modal-prev' onClick={findPrev} onKeyDown={this.handleKeyDown} style={{
                            position: 'absolute',
                            left: 0,
                            right: 'auto',
                            top: 'calc(50% - 25px)',
                            borderRadius: '0 5px 5px 0',
                            fontSize: '60px',
                            lineHeight: '40px',
                        }}><FontAwesomeIcon icon={faArrowLeft} /></a>}
                        {hasNext && <a href='#' className='modal-next' onClick={findNext} onKeyDown={this.handleKeyDown} style={{
                            position: 'absolute',
                            right: 0,
                            top: 'calc(50% - 25px)',
                            fontSize: '60px',
                            borderRadius: '5px 0 0 5px',
                            lineHeight: '40px',

                        }}><FontAwesomeIcon icon={faArrowRight} /></a>}
                        <img src={src} style={{
                            width: '100%',
                            height: 'auto',
                        }} />
                    </div>
                </div>
            </div>
        )
    }
}

GalleryModal.propTypes = {
    closeModal: PropTypes.func,
    findPrev: PropTypes.func,
    findNext: PropTypes.func,
    hasPrev: PropTypes.bool,
    hasNext: PropTypes.bool,
    src: PropTypes.string,
};





export default Gallery;
